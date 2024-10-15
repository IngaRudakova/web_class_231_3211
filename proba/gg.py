import string
import matplotlib.pyplot as plt
from collections import Counter
def count_characters(text):
    # Определяем русский алфавит
    russian_alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя'
    count ='1234567890'
    alphabet = count
    text = text.lower()
    
    char_counter = Counter(text)  # Считаем символы
    for char in alphabet:
        yield char, char_counter[char]  # Возвращаем символ и его частоту

def plot_character_frequency(text):
    character_frequencies = list(count_characters(text))
    x_values = [x[0] for x in character_frequencies]
    y_values = [y[1] for y in character_frequencies]
    
    fig, ax = plt.subplots()
    ax.bar(x_values, y_values, color='blue')
    ax.set_xticks(x_values)
    ax.set_xticklabels(x_values, rotation=0)
    ax.set_title('Шифр Атбаш')
    ax.set_xlabel('Буквы')
    ax.set_ylabel('Количество')
    
    plt.show()

# Пример использования функции
text = 'ЛЕОПАРДНЕМОЖЕТИЗМЕНИТЬСВОИХПЯТЕНТЧК'
atbash = 'фъсряпытъусщънчшуътчнгоэсчкранътних'
polibia1='2616333411351532163133211641232231163223415536133323443462411632414625'
plot_character_frequency(polibia1)