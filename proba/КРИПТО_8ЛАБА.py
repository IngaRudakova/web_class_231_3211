def create_symbol_to_id_map(input_string):
    # Создать пустой словарь для хранения уникальных символов и их идентификаторов
    symbol_to_id = {}
    k = 1
    
    # Заполнить словарь каждым уникальным символом и соответствующим идентификатором
    for i in input_string:
        if i not in symbol_to_id:
            symbol_to_id[i] = k
            k += 1
    return symbol_to_id

def convert_string_to_ids(new_string, symbol_to_id):
    # Преобразовать строку в список десятичных идентификаторов
    converted_list = [symbol_to_id[symbol] for symbol in new_string if symbol in symbol_to_id]
    
    return converted_list

# ТУТ НИЧЕ НЕ ТРОГАТЬ ЭТО АЛФАВИТ
input_string = "абвгдежзийклмнопрстуфхцчшщъыьэюя"
symbol_to_id = create_symbol_to_id_map(input_string)
print("AЛФАВИТ:\n", symbol_to_id, '\n')

#СЮДА СВОЮ ФРАЗУ 
new_string = "нужновытягиватьногизптнасколькопозволяютпростынитчк"
converted_list = convert_string_to_ids(new_string, symbol_to_id)
print("ЭТО МЫ ПРИСВАИВАЕМ КАЖДОЙ БУКВЕ ЗНАЧЕНИЕ АЛФАВИТА:\n", converted_list)


def decimal_to_6bit_binary(n):
    # Преобразовать число в двоичное представление
    binary_representation = bin(n)[2:]  # Используем [2:] чтобы убрать префикс '0b'

    # Добавить ведущие нули, если необходимо, чтобы длина строки была 6
    binary_6bit = binary_representation.zfill(6)

    return binary_6bit

# ЭТО КОЛ-ВО ВСЕГО СИМВОЛОВ В ФРАЗЕ 
f = ''
for i in range(len(converted_list)):
    decimal_number = converted_list[i]
    binary_6bit_result = decimal_to_6bit_binary(decimal_number)

    f += str(binary_6bit_result)
    #print(f"{decimal_number} в 6-битном двоичном виде: {binary_6bit_result}")
print(f)
print('ЭТО КОЛ-ВО ВСЕГО СИМВОЛОВ В ФРАЗЕ ', len(f), '\n')


#В ПЕРЕМННУЮ ТЕКСТ ВСТАВИТЬ СВОЮ ПОЛУЧИВНУЮСЯ СТРОКУ ИЗ ВТОРОГО НОМЕРА ДО ТОЙ ЧАСТИ ГДЕ ОНА ЗАЦИКЛИЛАСЬ 
text = '010101101010000'
def add_binary_strings(str1, str2):
    # Повторяем короткую строку, чтобы она соответствовала длине длинной строки
    max_length = max(len(str1), len(str2))
    str1 = str1 * (max_length // len(str1) + 1)
    str2 = str2 * (max_length // len(str2) + 1)

    # Обрезаем строки до одинаковой длины
    str1 = str1[:max_length]
    str2 = str2[:max_length]

   
    res = ''
    for bit1, bit2 in zip(str1, str2):
        result = ''
        if bit1 == '0' and bit2 == '0':
            result ='0'
        elif bit1 == '1' and bit2 == '1':
            result ='0'
        elif bit1 == '1' and bit2 == '0':
            result ='1'
        elif bit1 == '0' and bit2 == '1':
            result ='1'
        res += result
    return res


result = add_binary_strings(text, f)
print('ПЕРЕВОД СТРОКИ ДЕСЯТИЧНОЙ В БИНАРНУЮ\n',result)
print(len(result))

def add_spaces_every_five_chars(input_string):
    # Создаем список, куда будем добавлять куски строки
    parts = []
    
    # Проходимся по строке, шаг 5 символов
    for i in range(0, len(input_string), 5):
        # Добавляем кусок длиной 5 символов в список
        parts.append(input_string[i:i+5])
    
    # Объединяем части с пробелами
    result_string = ' '.join(parts)
    
    return result_string




# Применяем функцию к строке в переменной result
new_string = add_spaces_every_five_chars(result)

print("Оригинальная строка:", result)
print("С пробелами:", new_string)
print(len(new_string))