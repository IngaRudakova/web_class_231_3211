from collections import Counter

def chastota(text):
    text = text.lower()
    char_counter = Counter(text)
    total_chars = sum(char_counter.values())
    frequency = {char: count / total_chars for char, count in char_counter.items()}
    return frequency
text = "ЛЕОПАРДНЕМОЖЕТИЗМЕНИТЬСВОИХПЯТЕНТЧК"
frequency = chastota(text)
for char, freq in frequency.items():
    print(f"Буква: '{char}', Частота: {freq:.4f}")
