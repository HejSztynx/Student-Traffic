# Student Traffic — aplikacja wspierająca życie studenta na kampusie AGH 🏠🎓  

Aplikacja mobilna tworzona podczas hackathonu, mająca na celu ułatwienie życia studentom mieszkającym w akademikach Miasteczka Studenckiego AGH.

## Problem, który rozwiązujemy 🚀  

Życie studenckie w akademikach Miasteczka Studenckiego AGH to nie tylko nauka, ale również codzienne wyzwania organizacyjne — brak wolnej pralki, niepotrzebne rzeczy zalegające w pokojach, trudność w znalezieniu ludzi do wspólnej gry, czy brak informacji co się dzieje w okolicy.

Brakuje centralnego miejsca, które ułatwiłoby komunikację i organizację życia codziennego studentów — aplikacji stworzonej specjalnie pod potrzeby mieszkańców kampusu.

## Nasze rozwiązanie 💡  

Student Traffic to aplikacja mobilna tworzona z myślą o studentach mieszkających w akademikach AGH. Łączy w sobie funkcje praktyczne (rezerwacja pralek), społecznościowe (ogłoszenia i wydarzenia) oraz ułatwiające integrację (lokalizacja znajomych na kampusie).  

Celem aplikacji jest:  
- Usprawnienie codziennych czynności  
- Budowanie lokalnej społeczności studenckiej  
- Zwiększenie dostępności informacji  
- Promowanie aktywności i integracji  

---

## Funkcjonalności aplikacji

### 🧺 Rezerwacja pralek i suszarek  
System umożliwia studentom rezerwację pralek i suszarek w akademiku. Dodatkowo, użytkownik może określić planowany czas prania — dzięki temu kolejna osoba może rozpocząć pranie wcześniej, jeśli urządzenie będzie już wolne.

Funkcje dodatkowe:  
- Powiadomienia push o zbliżającym się końcu prania  
- Podgląd aktualnej dostępności pralek i suszarek  

### 🍞 Ogłoszenia jedzeniowe i rzeczy na wymianę  
Funkcja pozwala na wystawianie ogłoszeń związanych z jedzeniem lub rzeczami, które chcemy oddać lub sprzedać.  

Przykłady użycia:  
- Informacja o zostawionym jedzeniu w kuchni (np. chleb, owoce)  
- Giełda rzeczy — sprzedaż/oddanie przedmiotów (np. czajnik, mikrofalówka)  

### ⚽ Organizacja wydarzeń sportowych i gier (np. flanki)  
Moduł umożliwia organizację wydarzeń sportowych na kampusie. Użytkownik może zarezerwować boisko, utworzyć wydarzenie lub po prostu ogłosić spontaniczną grę we flanki.  

Dostępne funkcje:  
- Tworzenie wydarzenia z określoną liczbą graczy  
- Dołączanie i wypisywanie się z wydarzeń  
- Powiadomienia o nowych wydarzeniach w pobliżu

---

## Architektura projektu 🏗️  

Projekt składa się z dwóch głównych części:

| Część       | Technologia  | Opis                                          |
|-------------|--------------|-----------------------------------------------|
| Frontend    | ⚛️ React Native + shadcn/ui | Aplikacja mobilna na Android/iOS             |
| Backend     | ☕ Java | API REST, logika biznesowa, obsługa bazy danych   |
| Baza danych | 🔥 Firebase | Przechowywanie danych użytkowników i ogłoszeń  |
| Powiadomienia push | 📲 Firebase Cloud Messaging | Wysyłanie powiadomień push do aplikacji  |

---  

## Zespół 👥

- Gołuchowski Krzysztof
- Grześ Jakub
- Masternak Jan
- Sienkiewicz Krystian
- Smyda Tomasz
- Wala Mateusz

---

