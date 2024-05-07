# Erstellung einer Benchmark zur Bestimmung des Verwaltungssystems für den ISCC - Gegenüberstellung von relationalen und Vektordatenbanken

## Abstrakt

Die Verbreitung von Mis- und Desinformationen im Internet wird als die größte Gefahr in den kommenden zwei Jahren eingestuft. Der ISCC könnte dazu beitragen, diese Gefahr zu reduzieren. Das Verwalten der Daten des ISCCs in einer performanten Datenbank ist essenziell, um möglichst effektiv originale Medieninhalte im Internet aufzufinden. In dieser Arbeit soll eine Benchmark entwickelt werden, um die Performanz von Datenbanksystemen in Bezug auf die Verwaltung der Daten des ISCCs bewerten zu können. Die Benchmark wird auf relationale und Vektordatenbanken angewendet. Nach der Auswertung der Ergebnisse wird eine Empfehlung für das zu verwendende Verwaltungssystem für den ISCC abgegeben.

## ISCC

Der International Standard Content Code (ISCC) ist ein Verfahren, um digitale Medieninhalte im Internet zu identifizieren und befindet sich momentan in einem Verfahren als ISO-Standard zertifiziert zu werden. Titusz Pan und die ISCC Foundation entwickelten 2019 den ISCC, der verschiedenste digitale Medientypen wie Audio, Video, Bilder, Texte und eine Vielzahl der gängigsten Dateiformate unterstützt. Bei der Generierung des ISCCs werden vier Hash-Werte erstellt (Units), die zusammen eine 55-stellige Zeichenkette erzeugen (ISCC). Durch das Vergleichen der Hash-Werte von zwei unterschiedlichen digitalen Medien, kann eine Aussage über deren Ähnlichkeit getroffen werden.

## Eigenleistung

Neben der Entwicklung des eigentlichen Testverfahrens soll für die Benchmark ein Backend und ein Frontend entwickelt werden. Das Backend ist für die Durchführung und das Frontend für die Visualisierung der Tests verantwortlich. Die Schnittstelle des Backends zur Implementierung der Datenbanken soll möglichst abstrakt implementiert werden, um die Einbindung und das Testen weiterer Verwaltungssysteme so einfach wie möglich zu gestalten. Die Benchmark wird zunächst auf die relationale Datenbank PostgreSQL und auf die Vektordatenbank Milvus angewendet. Die einzelnen Komponenten, bestehend aus dem Backend, den Datenbanken und dem Frontend, werden mit Hilfe von Docker in Containern in einem Docker-Netzwerk verwaltet. Nach Beendigung der Tests werden die vom Frontend dargestellten Ergebnisse analysiert und ausgewertet. Abschließend wird eine Empfehlung für das zu verwendende Verwaltungssystem für den ISCC abgegeben.

## Zeitplan

Die Tabelle 1 stellt den geplanten Ablauf der Arbeit dar. Der Zeitplan soll zur Orientierung und Strukturierung der Arbeit dienen.

| Monat | Aufgabe |
| --- | --- |
| Mai | Einarbeitung in PostgreSQL, Milvus, Docker und Benchmarking |
| Juni - Juli | Entwicklung&Durchführung der Benchmark |
| August | Erstellen der Präsentation & wissenschaftliche Arbeit |