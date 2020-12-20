import numpy as np
import pandas as pd
import requests
from PIL import Image, ImageEnhance
from google.cloud import vision
import io
import cv2 as cv
from flask import Flask, request, jsonify
from NLP.k import predict
app = Flask(__name__)

@app.route("/prediction", methods=["POST"])
def prediction():
    # print("Reached correctly")
    data = request.get_json(force=True)
    # tp = ["Cocoa", "Notebooks", "Chips"]
    print(data['data'])
    # res = "Food"
    res = predict([data['data']])
    print(res)
    return {"category":res[0]}

def detect_text(path):
    """Detects text in the file."""
    
    client = vision.ImageAnnotatorClient()

    words = []
    poly_bounds = []
    
    with io.open(path, 'rb') as image_file:
        content = image_file.read()
    
    image = vision.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations
    
    # print('Texts:')
    
    vertices = []
    for text in texts:
        # print('\n"{}"'.format(text.description))
        li = []
        for vertex in text.bounding_poly.vertices:
            li.append([vertex.x, vertex.y])
        words.append(text.description)
        poly_bounds.append(li)
        # print(li)
    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))
    return texts, words, poly_bounds

def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        return False

def find_content_from_output(texts, words, poly_bounds):
    st = ""
    n = 0
    count_words = 0
    out = []

    for word in words:
        
        if count_words == 0:
            count_words += 1
            continue
        
        elif count_words == 1:
            out.append([word, poly_bounds[count_words]])
            count_words += 1
        else:
            [[x_a, y_a], [x_b, y_b], [x_c, y_c], [x_d, y_d]] = poly_bounds[count_words]
            count_words += 1
            flag = 0
            for i in out:
                [[x_a1, y_a1], [x_b1, y_b1], [x_c1, y_c1], [x_d1, y_d1]] = i[1]
                if flag == 1:
                    break
                    
                if abs(y_a1 - y_a)>15:
                    continue
                
                else:
                    flag = 1
                    if x_b1 < x_a:
                        temp_word = i[0]
                        if x_a-x_b1 > 30:
                            temp_word = temp_word +"\t"+ word
                            i[0] = temp_word
                            i[1] = [[x_a1, y_a1], [x_b, y_b], [x_c, y_c], [x_a1, y_a1]]
                        elif x_a-x_b1 > 7:
                            temp_word = temp_word +" "+ word
                            i[0] = temp_word
                            i[1] = [[x_a1, y_a1], [x_b, y_b], [x_c, y_c], [x_a1, y_a1]]
                        else:
                            temp_word = temp_word +""+ word
                            i[0] = temp_word
                            i[1] = [[x_a1, y_a1], [x_b, y_b], [x_c, y_c], [x_a1, y_a1]]
                        
                    else:
                        temp_word = i[0]
                        if x_b1-x_a > 30:
                            temp_word = word +"\t"+ temp_word
                            i[0] = temp_word
                            i[1] = [[x_a, y_a], [x_b1, y_b1], [x_c1, y_c1], [x_a, y_a]]
                        elif x_b1-x_a > 7:
                            temp_word = word +" "+ temp_word
                            i[0] = temp_word
                            i[1] = [[x_a, y_a], [x_b1, y_b1], [x_c1, y_c1], [x_a, y_a]]
                        else:
                            temp_word = word +""+ temp_word
                            i[0] = temp_word
                            i[1] = [[x_a, y_a], [x_b1, y_b1], [x_c1, y_c1], [x_a, y_a]]
            
            if flag == 0:
                out.append([word, poly_bounds[count_words-1]])
    
    products_name = []
    categories = []
    prices = []
    for i in out:
        x = i[0].split("\t")
        #print(x)
        
        item = ""
        price = 0
        for j in x:
            if is_number(j) == True:
                price = float(j)
            else:
                item = item+" "+j
        item.strip(" ")
        # print(item, price)
        if item!="" and price>1:
            products_name.append(item)
            prices.append(price)
    if len(products_name)>=1:
        categories = predict(products_name)
    return products_name, categories, prices

@app.route("/image_ocr", methods=["POST"])
def ocr_enable():
    data = []
    path = request.get_json(force=True)
    # print(path)
    url = path['src']
    print(url)
    response = requests.get(url)
    img = Image.open(io.BytesIO(response.content))
    enhancer = ImageEnhance.Contrast(img)
    img2 = enhancer.enhance(2)
    # img2 = np.array(img2)
    img2.save("Bill.jpg")
    img2 = cv.imread("Bill.jpg", 0)
    img2 = cv.GaussianBlur(img2, (5,5), 0)
    # th = cv.threshold(img2, 5, 255, cv.THRESH_OTSU | cv.THRESH_BINARY)[1]
    th = cv.adaptiveThreshold(img2,255,cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY,15,5)
    cv.imwrite("Bill.jpg", th)

    texts, words, poly_bounds = detect_text("Bill.jpg")

    names, categories, prices = find_content_from_output(texts, words, poly_bounds)
    for i in range(0, len(names)):
        print(names[i], categories[i], prices[i])

    return {"Items":names, "Categories":categories, "Prices":prices}