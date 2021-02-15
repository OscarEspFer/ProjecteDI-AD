drop database if exists gestionotes;
create database gestionotes;
use gestionotes;
create table usuaris(
	ID_usuaris int AUTO_INCREMENT primary key,
    nom Varchar(255),
    pass Varchar(255),
    nom_complet Varchar(255),
    imatge blob
);
create table professors(
	ID_professors int primary Key,
    departament Varchar(255),
    FOREIGN KEY (ID_professors) REFERENCES usuaris(ID_usuaris)
);
create table alumnes(
	ID_alumnes int primary Key,
    curs varchar(255),
    repeteix bool,
	FOREIGN KEY (ID_alumnes) REFERENCES usuaris(ID_usuaris)
);
create table assignatures(
	ID_assignatures int auto_increment primary key,
    codi Varchar(3),
    nom_complet Varchar(255),
    hores_setmanals float,
    modul varchar (255),
    curs varchar (255)
);
create table docencia(
	primary key (alumne,assignatura,professor),
	professor int,
    alumne int,
    nota float,
    assignatura int,
    FOREIGN KEY (professor) REFERENCES professors(ID_professors),
    FOREIGN KEY (alumne) REFERENCES alumnes(ID_alumnes),
    FOREIGN KEY (assignatura) REFERENCES assignatures(ID_assignatures),
    Unique key assigatura(alumne,assignatura)
);
create table missatges(
	ID_missatges int auto_increment primary key,
    professor int,
    alumne int,
	missatge text,
    imatge varchar (255),
    FOREIGN KEY (professor) REFERENCES professors(ID_professors),
    FOREIGN KEY (alumne) REFERENCES alumnes(ID_alumnes)
);

#####

insert into usuaris (nom, pass,nom_complet) values ("profe1","pass1","profe1complet");
insert into usuaris (nom, pass,nom_complet) values ("profe2","pass2","profe2complet");
insert into usuaris (nom, pass,nom_complet) values ("alumne1","pass1","alumne1complet");
insert into usuaris (nom, pass,nom_complet) values ("alumne2","pass2","alumne2complet");
insert into usuaris (nom, pass,nom_complet) values ("alumne3","pass3","alumne3complet");
insert into usuaris (nom, pass,nom_complet) values ("alumne4","pass4","alumne4complet");
insert into professors (ID_professors, departament) values (1,"dep1");
insert into professors (ID_professors, departament) values (2,"dep2");
insert into alumnes (ID_alumnes, curs, repeteix) values (3,"1DAM",false);
insert into alumnes (ID_alumnes, curs, repeteix) values (4,"2DAM",true);
insert into alumnes (ID_alumnes, curs, repeteix) values (5,"2DAM",false);
insert into alumnes (ID_alumnes, curs, repeteix) values (6,"1ASIX",false);

insert into assignatures (codi,nom_complet,hores_setmanals,modul,curs) values ("PRG","Programació",6,"DAM","1");
insert into assignatures (codi,nom_complet,hores_setmanals,modul,curs) values ("AD","Acces a Dades",6,"DAM","2");
insert into assignatures (codi,nom_complet,hores_setmanals,modul,curs) values ("DI","Disseny d'Interficies",6,"DAM","2");
insert into assignatures (codi,nom_complet,hores_setmanals,modul,curs) values ("SGE","Sistemes de gestió empresarial",5,"DAM","2");

insert into docencia (professor, alumne, nota, assignatura) values (1,3,2,3);
insert into docencia (professor, alumne, nota, assignatura) values (2,3,6,2);
insert into docencia (professor, alumne, nota, assignatura) values (1,4,8,3);
insert into docencia (professor, alumne, nota, assignatura) values (2,4,5,2);