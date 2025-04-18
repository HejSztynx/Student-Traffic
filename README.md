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
| Frontend    | ⚛️ React + shadcn/ui | Aplikacja webowa            |
| Backend     | ☕ Java | API REST, logika biznesowa, obsługa bazy danych   |
| Baza danych | 🔥 Firebase | Przechowywanie danych użytkowników i ogłoszeń  |

---  

## Zespół 👥

- Gołuchowski Krzysztof
- Grześ Jakub
- Masternak Jan
- Sienkiewicz Krystian
- Smyda Tomasz
- Wala Mateusz


## Raport z retrospektywy:  

### Wstęp:  

W ramach pierwszego dnia Hakatonu udało nam się stworzyć działający frontend i wykonać pracy nad backendem.  
W toku prac naturalnie zaczęliśmy zastanawiać się nad paroma kwestiami, zarówno pozytywnymi, jak i negatywnymi.  
W niniejszym sprawozdaniu zostaną zarówno te pierwsze, jak i te ostatnie zostaną poruszone.

### Kwestie pozytywne:  

Jesteśmy bardzo zadowoleni ze sposobu w jaki udało nam się skoordynować pracę między członków grupy w taki sposób, by każdy  
zajmował się tą częścią projektu, nad którą był rzeczywiście w stanie pracować w sprawny sposób. Jest to tym lepsze, że udało się
osiągnąć nie blokując się nawzajem, tj. uniknęliśmy sytuacji, w której to jedna z osób musiałaby beznczynnie czekać, by
móc pracować dalej.

Uważamy też że byliśmy elastyczni w kwestii pomocy - jeśli jedna z osób w grupie chciała inną o coś zapytać, udawało nam się  
godzić to z brakiem generalnego spadku wydajności stron.

### Kwestie negatywne:

W trakcie pracy zorientowaliśmy się, że podjęliśmy kilka złych decyzji odnośnie projektu modelu bazy danych, czyli czegoś od czego zaczęliśmy pracę tego dnia.
Pokstukowało to napisaniem pewnej ilości kodu, który koniec końców okazał się zbędny. 

Kolejną problematyczną kwestią okazało się implementowanie komunikacji z bazą danych z poziomu backendowego kodu. Wynikało to głownie z braku większej znajomości ze Springiem
osoby odpowiedzialnej za zadanie oraz nieco nieskuteczną komunikacją z osobą, która miała przy tym pomagać.

### Przedyskutowanie kwestii negatywnych:  

W ramach retrospektywy postanowiono przedyskutować obydwie z wyżej wymienionych negatywych kwestii.

Osobie, która zauważyła błąd z początkowym projektem zapytano dlaczego uważała, że należy to zmienić i po wspólnej naradzie zdecydowano się trzymać się zmiany.
Inni członkowie zespołu zgłosili jeszcze inne potencjalne problemy z projektem, które im przyszły do głowy i wspólnie omówiliśmy je i koniec końców zdecydowano się 
jak powinien wyglądać schemat bazy w dalszej części projektu.

Co do drugiej kwestii postanowiono, że springowym backendem od tej pory będzie zajmować się przynajmniej jedna dodatkowa osoba z zespołu, która jest z tematem dobrze zaznajomiona.

---

## Jak uruchomić projekt lokalnie? 🖥

Należy zainstalować następujące narzędzia:

- [Node.js](https://nodejs.org/en/download/) (wraz z `npm`) - przetestowane na wersji `v22.14.0 (LTS)`

Następnie należy przejść do katalogu `frontend` i wykonać tam następujące polecenia:

```bash
npm install --legacy-peer-deps
npm run dev
```

Aplikacja powinna być dostępna pod adresem `http://localhost:3000`.

Naszym oczom ukaże się napis "This app is only available on mobile." - należy zmniejszyć okno przeglądarki, aby wymusić widok mobilny.

Jeśli wszystko poszło dobrze, powinniśmy zobaczyć ekran logowania. Jako nazwę użytkownika należy wpisać `test`, a jako hasło `test1234`.

Ze względu na darmowy hosting, pierwsze wywołanie API może zająć nawet 90 sekund.