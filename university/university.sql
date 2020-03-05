CREATE TABLE jurusan (
    id_jurusan      INTEGER     PRIMARY KEY     NOT NULL,
    nama_jurusan    VARCHAR(50)                 NOT NULL
);

CREATE TABLE mahasiswa (
    nim             INTEGER     PRIMARY KEY     NOT NULL,
    nama_mahasiswa  VARCHAR(50)                 NOT NULL,
    alamat          VARCHAR(50)                 NOT NULL,
    id_jurusan      VARCHAR(20),                 
    FOREIGN KEY(id_jurusan) REFERENCES jurusan(id_jurusan)
 );

CREATE TABLE mata_kuliah (
     id_mata_kuliah     INTEGER     PRIMARY KEY     NOT NULL,
     nama_mata_kuliah   VARCHAR(20)                 NOT NULL,  
     sks                INTEGER                     NOT NULL
 );

CREATE TABLE dosen (
    nip_dosen       INTEGER         PRIMARY KEY         NOT NULL,
    nama_dosen      VARCHAR(50)                         NOT NULL
);

CREATE TABLE kontrak (
    id_kontrak      INTEGER     PRIMARY KEY     NOT NULL,
    nilai           VARCHAR(2)                  NOT NULL,
    nim             INTEGER, 
    id_mata_kuliah  INTEGER,
    nip_dosen       INTEGER,
    FOREIGN KEY(nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY(id_mata_kuliah) REFERENCES mata_kuliah(id_mata_kuliah),
    FOREIGN KEY(nip_dosen) REFERENCES dosen(nip_dosen)
    );

INSERT INTO jurusan (id_jurusan, nama_jurusan)  
VALUES (132431, 'Informatika'),
(132432, 'Desain'),
(132433, 'Teknik Mesin');

INSERT INTO mahasiswa (nim, nama_mahasiswa, alamat, id_jurusan)  
VALUES (1001, 'Antonia Banderas', 'Jl. Matahari', 132431),
(1002, 'Felix Jr', 'Jl. Bulan', 132431),
(1003, 'Elizabeth Olsen', 'Jl. Neptunus', 132432),
(1004, 'Adam Levine', 'Jl. Saturnus', 132432),
(1005, 'Victoria', 'Jl. Mars', 132433),
(1006, 'Steve Jobs', 'Jl. Bumi', 132433);

INSERT INTO mata_kuliah (id_mata_kuliah, nama_mata_kuliah, sks)  
VALUES (4561, 'Agama', 3),
(4562, 'Database', 3),
(4563, 'Logic', 3),
(4564, 'Kimia', 3),
(4565, 'Melukis', 3),
(4566, 'Indonesia', 3);

INSERT INTO dosen (nip_dosen, nama_dosen)  
VALUES (34561, 'Dr. Agus Rahmat'),
(34562, 'Dr. Anubis'),
(34563, 'Dr. Valkrie');

INSERT INTO kontrak (id_kontrak, nilai, nim, id_mata_kuliah, nip_dosen)  
VALUES (9871, 'B', 1001, 4563, 34562),
(9872, 'A', 1003, 4564, 34562),
(9873, 'D', 1002, 4562, 34563),
(9874, 'C', 1005, 4565, 34563),
(9875, 'E', 1006, 4566, 34561),
(9876, 'B', 1004, 4561, 34561);