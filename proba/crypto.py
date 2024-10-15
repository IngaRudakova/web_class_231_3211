from collections import Counter
'''
def count_characters(text):
    char_counter = Counter(text)
    for char in sorted(char_counter):
        print(f"{char}: {char_counter[char]}")

# Пример использования функции
text = 'ЛЕОПАРДНЕМОЖЕТИЗМЕНИТЬСВОИХПЯТЕНТЧК'
count_characters(text)'''
import string
import matplotlib.pyplot as plt
from collections import Counter

def count_characters(text):
    # Определяем русский алфавит
    russian_alphabet = 'абвгдежзийклмнопрстуфхцчшщъыьэюя'
    #count ='1234567890'
    
    alphabet = russian_alphabet
    text = text.lower()

    char_counter = Counter(text)  # Считаем символы
    for char in alphabet:
       yield char, char_counter[char]  # Возвращаем символ и его частоту

    
    #numbers = [text[i:i+2] for i in range(0, len(text), 2)]
    #number_counter = Counter(numbers)
    #all_numbers = [str(i).zfill(2) for i in range(10, 65)]
    # Считаем частоту двузначных чисел
    #number_counter = Counter(numbers)
    #for number in sorted(number_counter.keys()):
     #   yield number, number_counter[number]  # Возвращаем число и его частоту
    #for number in all_numbers:
       # yield number, number_counter.get(number, 0)


def plot_character_frequency(text):
    character_frequencies = list(count_characters(text))
    x_values = [x[0] for x in character_frequencies]
    y_values = [y[1] for y in character_frequencies]
    
    fig, ax = plt.subplots()
    #bars = ax.bar(x_values, y_values, color='blue')
    ax.bar(x_values, y_values, color='blue')
    ax.set_xticks(x_values)
    ax.set_xticklabels(x_values, rotation=0)
    ax.set_title('Шифр Виженера-2')
    ax.set_xlabel('Буквы')
    ax.set_ylabel('Количество')
    
    #for bar in bars:
    #    yval = bar.get_height()
     #   ax.text(bar.get_x() + bar.get_width()/2, yval, int(yval), ha='center', va='bottom')
    plt.tight_layout()
    plt.show()

def shift_string(text, shift):
    result = []
    for char in text:
        if 'а' <= char <= 'я':  # Проверка на строчные буквы
            shifted = chr((ord(char) - ord('а') + shift) % 32 + ord('а'))
            result.append(shifted)
        elif 'А' <= char <= 'Я':  # Проверка на заглавные буквы
            shifted = chr((ord(char) - ord('А') + shift) % 32 + ord('А'))
            result.append(shifted)
        else:
            result.append(char)  # Неизменяем символы, которые не являются буквами
    return ''.join(result)

# Пример использования
text = 'ЛЕОПАРДНЕМОЖЕТИЗМЕНИТЬСВОИХПЯТЕНТЧК'
shifted_text = shift_string(text, 3)
#print(shifted_text)

# Пример использования функции
text = 'ЛЕОПАРДНЕМОЖЕТИЗМЕНИТЬСВОИХПЯТЕНТЧК'
atbash = 'фъсряпытъусщънчшуътчнгоэсчкранътних'
polibia1='2616333411351532163133211641232231163223415536133323443462411632414625'
tritemia = 'лжртгхкфнхшссяццьцяыжсзщжбпкыпгмтшм'
belazo =   'пуъуоьиысрьтйафлъссцюаяотубунюйыюыш'
viznera =  'хруэпрфстсъфлиъпустхъонурцэдосчтяйб'
viznera_2= 'лрюннэбоуянушктщекчяснюаоцлъщлрэпжр'
kardano ='злементничекарокпаимортплдьрснсгвевоомотпоихфпуухяаажркетнти'
ver_perestan=      'днтькчсиерамнвтноеопожмиетхзеелтипя'
ver_perestan_cod = 'днтькеезхтреисчожмиепоеонлтипяамнвт'
plot_character_frequency(viznera_2)

