CREATE TABLE jurusan (
    id_jurusan      INTEGER     PRIMARY KEY     NOT NULL,
    nama_jurusan    VARCHAR(50)                 NOT NULL
);

CREATE TABLE mahasiswa (
    nim             INTEGER     PRIMARY KEY     NOT NULL,
    nama_mahasiswa  VARCHAR(50)                 NOT NULL,
    alamat          VARCHAR(50)                 NOT NULL,
    nama_jurusan    VARCHAR(20),                 
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

INSERT INTO mahasiswa (nim, nama_mahasiswa, alamat, umur)  
VALUES (1001, 'Antonio Bace', 'Jl. Matahari', 20),
(1002, 'Felix Jr', 'Jl. Bulan', 21),
(1003, 'Elizabeth Olsen', 'Jl. Neptunus', 18),
(1004, 'Adam Levine', 'Jl. Saturnus', 19),
(1005, 'Victoria', 'Jl. Mars', 18),
(1006, 'Steve Jobs', 'Jl. Bumi', 19);

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

-- Add new column
ALTER TABLE mahasiswa
ADD COLUMN umur INTEGER;

-- Add value to column umur
UPDATE mahasiswa
SET umur = 20
WHERE nim = 1001;

UPDATE mahasiswa
SET umur = 21
WHERE nim = 1002;

UPDATE mahasiswa
SET umur = 18
WHERE nim = 1003;

UPDATE mahasiswa
SET umur = 19
WHERE nim = 1004;

UPDATE mahasiswa
SET umur = 18
WHERE nim = 1005;

UPDATE mahasiswa
SET umur = 19
WHERE nim = 1006;

-- JOIN 2 tables
SELECT mahasiswa.nim, mahasiswa.nama_mahasiswa, mahasiswa.alamat, mahasiswa.id_jurusan, jurusan.nama_jurusan, mahasiswa.umur 
FROM mahasiswa 
INNER JOIN jurusan 
ON mahasiswa.id_jurusan = jurusan.id_jurusan;

-- List mahasiswa under 20
SELECT * FROM mahasiswa
WHERE umur < 20;

-- List nilai >= B
SELECT mahasiswa.nim, mahasiswa.nama_mahasiswa, jurusan.nama_jurusan, mata_kuliah.nama_mata_kuliah, kontrak.nilai, dosen.nama_dosen
FROM ((((mahasiswa INNER JOIN kontrak ON mahasiswa.nim = kontrak.nim)
INNER JOIN jurusan ON mahasiswa.id_jurusan = jurusan.id_jurusan)
INNER JOIN mata_kuliah ON kontrak.id_mata_kuliah = mata_kuliah.id_mata_kuliah)
INNER JOIN dosen ON kontrak.nip_dosen = dosen.nip_dosen)
WHERE nilai BETWEEN 'A' AND 'B';

-- Add values to table kontrak
INSERT INTO kontrak (id_kontrak, nilai, nim, id_mata_kuliah, nip_dosen)
VALUES (9877, 'B', 1001, 4562, 34562),
(9878, 'A', 1001, 4564, 34562),
(9879, 'D', 1001, 4565, 34563),
(9880, 'C', 1003, 4565, 34563),
(9881, 'E', 1003, 4566, 34561),
(9882, 'B', 1003, 4561, 34561);

-- List of mahasiswa with more than SKS > 10
SELECT mahasiswa.nim, mahasiswa.nama_mahasiswa, mata_kuliah.nama_mata_kuliah, SUM(sks)
FROM ((mahasiswa 
INNER JOIN kontrak ON mahasiswa.nim = kontrak.nim)
INNER JOIN mata_kuliah ON kontrak.id_mata_kuliah = mata_kuliah.id_mata_kuliah)
GROUP BY kontrak.nim
HAVING SUM(sks) > 10;

-- Kontrak 'data mining'
SELECT mahasiswa.nim, mahasiswa.nama_mahasiswa, mata_kuliah.nama_mata_kuliah, SUM(sks)
FROM ((mahasiswa 
INNER JOIN kontrak ON mahasiswa.nim = kontrak.nim)
INNER JOIN mata_kuliah ON kontrak.id_mata_kuliah = mata_kuliah.id_mata_kuliah)
WHERE nama_mata_kuliah = 'Data Mining';

-- Show the number of mahasiswa for each dosen
SELECT dosen.nip_dosen, dosen.nama_dosen, COUNT (mahasiswa.nama_mahasiswa)
FROM ((kontrak 
INNER JOIN mahasiswa ON mahasiswa.nim = kontrak.nim)
INNER JOIN dosen ON kontrak.nip_dosen = dosen.nip_dosen)
GROUP BY kontrak.nip_dosen
HAVING COUNT (mahasiswa.nama_mahasiswa);

-- List mahasiswa by age
SELECT * FROM mahasiswa
ORDER BY umur ASC;

/* Show mata kuliah that must be repeated (nilai D & E), 
along show data mahasiswa jurusan and dosen */
SELECT mahasiswa.*, jurusan.nama_jurusan, mata_kuliah.*, kontrak.nilai, dosen.* 
FROM ((((mahasiswa INNER JOIN kontrak ON mahasiswa.nim = kontrak.nim)
INNER JOIN jurusan ON mahasiswa.id_jurusan = jurusan.id_jurusan)
INNER JOIN mata_kuliah ON kontrak.id_mata_kuliah = mata_kuliah.id_mata_kuliah)
INNER JOIN dosen ON kontrak.nip_dosen = dosen.nip_dosen)
WHERE nilai BETWEEN 'D' AND 'E';

