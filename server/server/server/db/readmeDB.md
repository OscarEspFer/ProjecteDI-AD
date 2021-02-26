# Gestió de notes BBDD

Observem l'esquema de la BBDD

![imatge](/img.png)

Podem trobar les següents taules
  - usuaris
  - professors
  - alumnes
  - docencia
  - missatges

Aquests interactuen de la següent manera:

Usuaris: Usuaris es la taula que tindra el registre dels usuaris, és a dir, la seua contrasenya, nom, etc.
Aquesta es relaciona amb professors i alumnes, ja que tant els professors com els alumnes son usuaris, i comparteixen l'ID amb aquesta taula.

Professors: La taula professors conte el departament al que pertany. A més del seu ID d'usuari.

Alumnes: La taula Alumnes conté el curs al que pertanyes, si son repetidors, a més del seu ID d'usuari.

Docencia: La taula docencia conté la nota d'un alumne en una assignatura. És a dir,la taula es relaciona amb professor i alumne ja que conté l'ID d'un professor que ha ficat la nota, l'ID del alumne al que se li ha posat la nota, així com la nota i el curs.

Missatges: La taula missatge conté missatges que es poden enviar entre alumnes i professors. Es relacionen amb Professors i alumnes per conseguir la seua ID.