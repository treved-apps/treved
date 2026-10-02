---
title: "Test"
date: "2026-01-01
summary: "This is for testing"
---




# Markdown priročnik

To je primer **Markdown** datoteke, ki prikazuje najpogostejše oznake za oblikovanje besedila.

## 1. Naslovi

# Naslov 1
## Naslov 2
### Naslov 3
#### Naslov 4
##### Naslov 5
###### Naslov 6

---

## 2. Oblikovanje besedila

- **Krepko besedilo**
- *Ležeče besedilo*
- ***Krepko in ležeče***
- ~~Prečrtano besedilo~~
- `Vrstična koda`
- <u>Podčrtano besedilo</u>

Lahko uporabimo tudi **kombinacijo *različnih* oblikovanj**.

---

## 3. Seznami

### Neurejen seznam

- Prva točka
- Druga točka
  - Podtočka
  - Še ena podtočka
- Tretja točka

### Urejen seznam

1. Prvi korak
2. Drugi korak
3. Tretji korak
   1. Podkorak
   2. Še en podkorak

### Kontrolni seznam

- [x] Končana naloga
- [ ] Nedokončana naloga
- [ ] Še ena naloga

---

## 4. Povezave

[Obišči Google](https://www.google.com)

Lahko uporabimo tudi samostojno povezavo:

<https://www.example.com>

---

## 5. Slika

![Primer slike](https://via.placeholder.com/300x150)

---

## 6. Citati

> To je citat.
>
> Citat lahko vsebuje več vrstic.

> **Pomemben del citata** lahko tudi poudarimo.

---

## 7. Koda

### Vrstična koda

Za izpis uporabimo `console.log()`.

### Blok kode

```python
def pozdrav():
    print("Pozdravljen, svet!")

pozdrav()
```

### JavaScript

```javascript
const ime = "Ana";
console.log(`Pozdravljena, ${ime}!`);
```

### HTML

```html
<h1>Pozdravljen, svet!</h1>
<p>To je primer HTML kode.</p>
```

---

## 8. Tabela

| Ime | Starost | Mesto |
|---|---:|---|
| Ana | 25 | Ljubljana |
| Marko | 31 | Maribor |
| Nina | 28 | Koper |

### Poravnava stolpcev

| Levo | Sredina | Desno |
|:---|:---:|---:|
| A | B | C |
| 1 | 2 | 3 |

---

## 9. Vodoravna črta

---

## 10. Posebni znaki

Markdown omogoča tudi uporabo posebnih znakov:

- `*` zvezdica
- `_` podčrtaj
- `#` lojtra
- `` ` `` narekovaj za kodo
- `>` znak za citat
- `-` pomišljaj
- `[]` oglate oklepaje
- `()` oklepaje

Če želimo prikazati Markdown znak kot navadno besedilo, lahko uporabimo **escape**:

\*To ni ležeče besedilo\*

\# To ni naslov

---

## 11. Opombe

To je besedilo z opombo.[^1]

[^1]: To je vsebina opombe.

---

## 12. Zložljiva vsebina

<details>
<summary>Klikni za prikaz dodatnih informacij</summary>

Ta vsebina je skrita, dokler uporabnik ne klikne na naslov.

Lahko vsebuje tudi **Markdown oblikovanje**.

</details>

---

## 13. Definicije

Markdown različice, ki podpirajo definicijske sezname, lahko uporabljajo naslednjo obliko:

Markdown
: Je lahek označevalni jezik.

HTML
: Je označevalni jezik za izdelavo spletnih strani.

---

## 14. Enačbe

Za okolja, ki podpirajo LaTeX, lahko uporabimo:

Inline enačba: $a^2 + b^2 = c^2$

Samostojna enačba:

$$
E = mc^2
$$

---

## 15. Emoji

Markdown lahko vsebuje tudi emoji:

😀 😎 🚀 ⭐ ❤️ 👍

---

## 16. Kombinacija različnih elementov

### Moj projekt

> **Cilj:** izdelati preprost program.

1. Namesti potrebna orodja.
2. Ustvari novo datoteko.
3. Zaženi program.

```python
print("Hello, Markdown!")
```

Nato obišči [uradno stran Markdown](https://www.markdownguide.org/).

---

## 17. Zaključek

Markdown omogoča preprosto oblikovanje dokumentov z uporabo posebnih oznak.

**Najpogostejše oznake:**

| Oznaka | Namen |
|---|---|
| `#` | Naslov |
| `**tekst**` | **Krepko** |
| `*tekst*` | *Ležeče* |
| `~~tekst~~` | ~~Prečrtano~~ |
| `` `koda` `` | `Vrstična koda` |
| `-` | Seznam |
| `1.` | Oštevilčen seznam |
| `>` | Citat |
| `[besedilo](url)` | Povezava |
| `![opis](slika)` | Slika |
| `---` | Vodoravna črta |
| ``` ``` | Blok kode |
| `|` | Tabela |
| `- [ ]` | Kontrolni seznam |

**Markdown je preprost, pregleden in zelo uporaben za dokumentacijo.**
