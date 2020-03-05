const sqlite3 = require('sqlite3').verbose();
const readline = require('readline');
const Table = require('cli-table');

let db = new sqlite3.Database("university.db", (err) => {
    if (err) throw err;
});
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log(`================================================
Welcome to Universitas Pendidikan Indonesia
Jl Setiabudhi No. 255
================================================`);

function login() {
    rl.question('username: ', (username) => {
        console.log(`================================================`)
        rl.question('password: ', (password) => {
            console.log(`================================================`)

            db.serialize(() => {
                let sqlLogin = `SELECT * FROM user WHERE username = '${username}' AND password = '${password}';`
                db.get(sqlLogin, (err, row) => {
                    if (err) throw err;
                    if (row) {
                        console.log(`Welcome, ${row.username}. Your access level is: ${row.user_role}`);
                        mainMenu();
                    } else {
                        console.log(`username atau password salah`);
                        login();
                    }
                })
            })
        })
    })
};

function mainMenu() {
    console.log(`================================================
silahkan pilih opsi di bawah ini
[1] Mahasiswa
[2] Jurusan
[3] Dosen
[4] Mata Kuliah
[5] Kontrak
[6] Keluar
================================================`);
    rl.question('masukkan salah satu no. dari opsi di atas:', (number) => {
        switch (number) {
            case '1':
                mahasiswa()
                break;
            case '2':
                jurusan()
                break;
            case '3':
                dosen()
                break;
            case '4':
                mataKuliah()
                break;
            case '5':
                kontrak()
                break;
            case '6':
                console.log(`================================================
Welcome to Universitas Pendidikan Indonesia
Jl Setiabudhi No. 255
================================================`);
                login()
                break;
            default:
                console.log('Mohon pilih no di atas!');
                mainMenu();
                break;
        }
    });
};

function mahasiswa() {
    console.log(`================================================
silahkan pilih opsi di bawah ini
[1] Daftar murid
[2] Cari murid
[3] Tambah murid
[4] Hapus murid
[5] Kembali
================================================`);
    rl.question('masukkan salah satu no. dari opsi di atas:', (number) => {
        switch (number) {
            case '1':
                daftarMurid()
                break;
            case '2':
                cariMurid()
                break;
            case '3':
                tambahMurid()
                break;
            case '4':
                hapusMurid()
                break;
            case '5':
                mainMenu()
                break;
            default:
                console.log('Mohon pilih no. di atas!');
                mainMenu();
                break;
        }
    });
};

function daftarMurid() {
    db.serialize(() => {
        let sqldaftarMurid = `SELECT mahasiswa.nim, mahasiswa.nama_mahasiswa, mahasiswa.alamat, mahasiswa.id_jurusan, jurusan.nama_jurusan, mahasiswa.umur 
        FROM mahasiswa 
        INNER JOIN jurusan 
        ON mahasiswa.id_jurusan = jurusan.id_jurusan;`
        db.all(sqldaftarMurid, (err, row) => {
            if (err) throw err;
            if (row) {
                var table = new Table({
                    head: ['NIM', 'Nama Mahasiswa', 'Alamat', 'Nama Jurusan', 'Umur']
                    , colWidths: [6, 19, 17, 17, 6]
                });
                row.forEach((item) => {
                    table.push(
                        [`${item.nim}`, `${item.nama_mahasiswa}`, `${item.alamat}`, `${item.nama_jurusan}`, `${item.umur}`]
                    );
                });
                console.log(table.toString());
                mahasiswa();
            } else {
                console.log(`Data tidak ditemukan!`);
                mahasiswa();
            }
        })
    })
}

function cariMurid() {
    rl.question('Masukkan NIM: ', (nim) => {
        console.log(`================================================`)
        db.serialize(() => {
            let sqlcariMurid = `SELECT mahasiswa.nim, mahasiswa.nama_mahasiswa, mahasiswa.alamat, mahasiswa.id_jurusan, jurusan.nama_jurusan, mahasiswa.umur 
            FROM mahasiswa 
            INNER JOIN jurusan 
            ON mahasiswa.id_jurusan = jurusan.id_jurusan
            WHERE nim = ${nim};`
            db.get(sqlcariMurid, (err, row) => {
                if (err) throw err;
                if (row) {
                    var table = new Table({
                        head: ['NIM', 'Nama Mahasiswa', 'Alamat', 'Nama Jurusan', 'Umur'],
                        colWidths: [6, 19, 17, 17, 6]
                    });
                    table.push(
                        [`${row.nim}`, `${row.nama_mahasiswa}`, `${row.alamat}`, `${row.nama_jurusan}`, `${row.umur}`]
                    );
                    console.log(table.toString());
                    mahasiswa();
                } else {
                    console.log(`mahasiswa dengan nim ${nim} tidak terdaftar`);
                    cariMurid();
                }
            })
        })
    })
}

function tambahMurid() {
    console.log('Lengkapi data di bawah ini:')
    rl.question('NIM: ', (nim) => {
        rl.question('Nama: ', (nama_mahasiswa) => {
            rl.question('Alamat: ', (alamat) => {
                rl.question('ID Jurusan: ', (id_jurusan) => {
                    rl.question('Umur: ', (umur) => {
                        console.log(`================================================`)

                        db.serialize(() => {
                            let sqltambahMurid = `INSERT INTO mahasiswa (nim, nama_mahasiswa, alamat, id_jurusan, umur) 
                            VALUES (${nim}, '${nama_mahasiswa}', '${alamat}', ${id_jurusan}, ${umur})`
                            db.run(sqltambahMurid, (err) => {
                                if (err) throw err;
                                let sqltampildata = `SELECT mahasiswa.nim, mahasiswa.nama_mahasiswa, mahasiswa.alamat, mahasiswa.id_jurusan, jurusan.nama_jurusan, mahasiswa.umur 
                                FROM mahasiswa 
                                INNER JOIN jurusan 
                                ON mahasiswa.id_jurusan = jurusan.id_jurusan`
                                db.all(sqltampildata, (err, row) => {
                                    if (err) throw err;
                                    if (row) {
                                        console.log(`Mahasiswa telah berhasil ditambahkan!`)
                                        var table = new Table({
                                            head: ['NIM', 'Nama Mahasiswa', 'Alamat', 'ID Jurusan', 'Umur'],
                                            colWidths: [6, 19, 17, 17, 6]
                                        });
                                        row.forEach((item) => {
                                            table.push(
                                                [`${item.nim}`, `${item.nama_mahasiswa}`, `${item.alamat}`, `${item.id_jurusan}`, `${item.umur}`]
                                            );
                                        })
                                        console.log(table.toString());
                                        mahasiswa();
                                    } else {
                                        tambahMurid();
                                    }
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

function hapusMurid() {
    rl.question(`================================================
Masukkan NIM mahasiswa yang akan dihapus: `, (nim) => {
        console.log(`================================================`)

        db.serialize(() => {
            let sqlhapusMurid = `DELETE FROM mahasiswa
            WHERE nim = ${nim};`
            console.log(`Mahasiswa dengan NIM: ${nim} telah dihapus!`);
            db.run(sqlhapusMurid, (err, row) => {
                if (err) throw err;

                let sqldaftarMurid = `SELECT mahasiswa.nim, mahasiswa.nama_mahasiswa, mahasiswa.alamat, mahasiswa.id_jurusan, jurusan.nama_jurusan, mahasiswa.umur 
                FROM mahasiswa 
                INNER JOIN jurusan 
                ON mahasiswa.id_jurusan = jurusan.id_jurusan;`
                db.all(sqldaftarMurid, (err, row) => {
                    if (err) throw err;
                    if (row) {
                        var table = new Table({
                            head: ['NIM', 'Nama Mahasiswa', 'Alamat', 'Nama Jurusan', 'Umur']
                            , colWidths: [6, 19, 17, 17, 6]
                        });
                        row.forEach((item) => {
                            table.push(
                                [`${item.nim}`, `${item.nama_mahasiswa}`, `${item.alamat}`, `${item.nama_jurusan}`, `${item.umur}`]
                            );
                        });
                        console.log(table.toString());
                        mahasiswa();
                    } else {
                        console.log(`Data tidak ditemukan!`);
                    }
                })
            })
        })
    })
}

function jurusan() {
    console.log(`================================================
silahkan pilih opsi di bawah ini
[1] Daftar jurusan
[2] Cari jurusan
[3] Tambah jurusan
[4] Hapus jurusan
[5] Kembali
================================================   `);
    rl.question('masukkan salah satu no. dari opsi di atas:', (number) => {
        switch (number) {
            case '1':
                daftarJurusan()
                break;
            case '2':
                cariJurusan()
                break;
            case '3':
                tambahJurusan()
                break;
            case '4':
                hapusJurusan()
                break;
            case '5':
                mainMenu()
                break;
            default:
                console.log('Mohon pilih no. di atas!');
                mainMenu();
                break;
        }
    })
}

function daftarJurusan() {
    db.serialize(() => {
        console.log(`================================================`);

        let sqljurusan = `SELECT * FROM jurusan;`
        db.all(sqljurusan, (err, row) => {
            if (err) throw err;
            if (row) {
                var table = new Table({
                    head: ['ID Jurusan', 'Nama Jurusan'],
                    colWidths: [12, 14]
                });
                row.forEach((item) => {
                    table.push(
                        [`${item.id_jurusan}`, `${item.nama_jurusan}`]
                    );
                })
                console.log(table.toString());
                jurusan();
            }
        })
    })
}

function cariJurusan() {
    rl.question('Masukkan ID Jurusan: ', (id_jurusan) => {
        console.log(`================================================`);
        db.serialize(() => {
            let sqlcariJurusan = `SELECT * FROM jurusan 
            WHERE id_jurusan = ${id_jurusan}`
            db.get(sqlcariJurusan, (err, row) => {
                if (err) throw err;
                if (row) {
                    var table = new Table({
                        head: ['ID Jurusan', 'Nama Jurusan'],
                        colWidths: [12, 14]
                    });
                    table.push(
                        [`${row.id_jurusan}`, `${row.nama_jurusan}`]
                    );
                    console.log(table.toString());
                    jurusan();
                } else {
                    console.log(`jurusan dengan ID ${id_jurusan} tidak terdaftar`);
                    cariJurusan();
                }
            })
        })
    })
}

function tambahJurusan() {
    console.log('================================================');
    console.log('Lengkapi data di bawah ini:');
    rl.question('ID Jurusan: ', (id_jurusan) => {
        rl.question('Nama Jurusan: ', (nama_jurusan) => {
            console.log('================================================');

            db.serialize(() => {
                let sqltambahJurusan = `INSERT INTO jurusan (id_jurusan, nama_jurusan)
                VALUES (${id_jurusan}, '${nama_jurusan}')`
                db.run(sqltambahJurusan, (err) => {
                    if (err) throw err;

                    let sqltampildata = `SELECT * FROM jurusan;`
                    db.all(sqltampildata, (err, row) => {
                        if (err) throw err;
                        if (row) {
                            console.log('Jurusan telah berhasil ditambahkan!');
                            var table = new Table({
                                head: ['ID Jurusan', 'Nama Jurusan'],
                                colWidths: [12, 14]
                            });
                            row.forEach((item) => {
                                table.push(
                                    [`${item.id_jurusan}`, `${item.nama_jurusan}`]
                                );
                            });
                            console.log(table.toString());
                            jurusan();
                        } else {
                            console.log('ga jalan bambang');
                            tambahJurusan();
                        }
                    })
                })
            })
        })
    })
}

function hapusJurusan() {
    rl.question(`================================================
Masukkan ID Jurusan yang akan dihapus: `, (id_jurusan) => {
        console.log(`================================================`);

        db.serialize(() => {
            let sqlhapusJurusan = `DELETE FROM jurusan 
            WHERE id_jurusan = ${id_jurusan};`
            console.log(`Jurusan dengan ID Jurusan ${id_jurusan} telah dihapus!`);
            db.run(sqlhapusJurusan, (err) => {
                if (err) throw err

                let sqldaftarJurusan = `SELECT * FROM jurusan;`
                db.all(sqldaftarJurusan, (err, row) => {
                    if (err) throw err;
                    if (row) {
                        var table = new Table({
                            head: ['ID Jurusan', 'Nama Jurusan'],
                            colWidths: [12, 14]
                        });
                        row.forEach((item) => {
                            table.push(
                                [`${item.id_jurusan}`, `${item.nama_jurusan}`]
                            );
                        });
                        console.log(table.toString());
                        jurusan();
                    } else {
                        console.log('Data tidak ditemukkan!');
                        hapusJurusan();
                    }
                })
            })
        })
    })
}

function dosen() {
    console.log(`================================================
silahkan pilih opsi dibawah ini
[1] Daftar dosen
[2] Cari dosen
[3] Tambah dosen
[4] Hapus dosen
[5] Kembali
================================================`);
    rl.question(`masukkan salah satu no. dari opsi di atas:`, (number) => {
        switch (number) {
            case '1':
                daftarDosen()
                break;
            case '2':
                cariDosen()
                break;
            case '3':
                tambahDosen()
                break;
            case '4':
                hapusDosen()
                break;
            case '5':
                mainMenu()
                break;
            default:
                console.log('Mohon pilih no. diatas!');
                mainMenu();
                break;
        }
    })
}

function daftarDosen() {
    db.serialize(() => {
        console.log(`================================================`)
        let sqldaftarDosen = `SELECT * FROM dosen;`
        db.all(sqldaftarDosen, (err, row) => {
            if (err) throw err;
            if (row) {
                var table = new Table({
                    head: ['NIP', 'Nama Dosen'],
                    colWidths: [12, 16]
                })
                row.forEach((item) => {
                    table.push(
                        [`${item.nip_dosen}`, `${item.nama_dosen}`]
                    )
                })
                console.log(table.toString());
                dosen();
            }
        })
    })
}

function cariDosen() {
    rl.question('Masukkan NIP: ', (nip_dosen) => {
        console.log(`================================================`);
        db.serialize(() => {
            let sqlcariDosen = `SELECT * FROM dosen WHERE nip_dosen = ${nip_dosen};`
            db.get(sqlcariDosen, (err, row) => {
                if (err) throw err;
                if (row) {
                    var table = new Table({
                        head: ['NIP', 'Nama Dosen'],
                        colWidths: [7, 17]
                    })
                    table.push(
                        [`${row.nip_dosen}`, `${row.nama_dosen}`]
                    );
                    console.log(table.toString());
                    dosen();
                } else {
                    console.log(`Dosen dengan NIP ${nip_dosen} tidak terdaftar`);
                }
            })
        })
    })
}

function tambahDosen() {
    console.log(`================================================
Lengkapi data di bawah ini:`);
    rl.question('NIP: ', (nip_dosen) => {
        rl.question('Nama dosen: ', (nama_dosen) => {
            console.log(`================================================`)

            db.serialize(() => {
                let sqltambahDosen = `INSERT INTO dosen (nip_dosen, nama_dosen)
                VALUES (${nip_dosen}, '${nama_dosen}')`
                db.run(sqltambahDosen, (err) => {
                    if (err) throw err;
                    let sqltampildata = `SELECT * FROM dosen;`

                    db.all(sqltampildata, (err, row) => {
                        if (err) throw err;
                        if (row) {
                            console.log(`Dosen telah berhasil ditambahkan!`);
                            var table = new Table({
                                head: ['NIP', 'Nama Dosen'],
                                colWidths: [7, 17]
                            });
                            row.forEach((item) => {
                                table.push(
                                    [`${item.nip_dosen}`, `${item.nama_dosen}`]
                                );
                            })
                            console.log(table.toString());
                            dosen();
                        } else {
                            tambahDosen();
                        }
                    })
                })
            })
        })
    })
}

function hapusDosen() {
    rl.question(`================================================
Masukkan NIP dosen yang akan dihapus: `, (nip_dosen) => {
        console.log(`================================================`);

        db.serialize(() => {
            let sqlhapusDosen = `DELETE FROM dosen 
            WHERE nip_dosen = ${nip_dosen};`
            console.log(`Dosen dengan NIP: ${nip_dosen} telah dihapus!`);
            db.run(sqlhapusDosen, (err, row) => {
                if (err) throw err;

                let sqldaftarDosen = `SELECT * FROM dosen;`
                db.all(sqldaftarDosen, (err, row) => {

                    if (err) throw err;
                    if (row) {
                        var table = new Table({
                            head: ['NIP', 'Nama Dosen'],
                            colWidths: [7, 17]
                        });
                        row.forEach((item) => {
                            table.push(
                                [`${item.nip_dosen}`, `${item.nama_dosen}`]
                            )
                        })
                        console.log(table.toString());
                        dosen();
                    } else {
                        console.log(`Data tidak ditemukan!`);
                    }
                })
            })
        })

    })
}

function mataKuliah() {
    console.log(`================================================
silahkan pilih opsi di bawah ini
[1] Daftar mata kuliah
[2] Cari mata kuliah
[3] Tambah mata kuliah
[4] Hapus mata kuliah
[5] Kembali
================================================`);
    rl.question(`Masukkan salah satu no. dari opsi di atas:`, (number) => {
        switch (number) {
            case '1':
                daftarMataKuliah()
                break;
            case '2':
                cariMataKuliah()
                break;
            case '3':
                tambahMataKuliah()
                break;
            case '4':
                hapusMataKuliah()
                break;
            case '5':
                mainMenu()
                break;
            default:
                console.log('Mohon pilih no. di atas!');
                mainMenu()
                break;
        }
    })
}

function daftarMataKuliah() {
    db.serialize(() => {
        let sqlmataKuliah = `SELECT * FROM mata_kuliah;`
        db.all(sqlmataKuliah, (err, row) => {
            if (err) throw err;
            if (row) {
                var table = new Table({
                    head: ['ID Mata Kuliah', 'Nama Mata Kuliah', 'SKS'],
                    colWidths: [16, 18, 5]
                })
                row.forEach((item) => {
                    table.push(
                        [`${item.id_mata_kuliah}`, `${item.nama_mata_kuliah}`, `${item.sks}`]
                    )
                })
                console.log(table.toString());
                mataKuliah();
            }
        })
    })
}

function cariMataKuliah() {
    rl.question('Masukkan ID Mata Kuliah: ', (id_mata_kuliah) => {
        console.log(`================================================`)
        db.serialize(() => {
            let sqlcariMataKuliah = `SELECT mata_kuliah.id_mata_kuliah, mata_kuliah.nama_mata_kuliah, mata_kuliah.sks  
            FROM mata_kuliah
            WHERE id_mata_kuliah = ${id_mata_kuliah};`
            db.get(sqlcariMataKuliah, (err, row) => {
                if (err) throw err;
                if (row) {
                    var table = new Table({
                        head: ['ID Mata Kuliah', 'Nama Mata Kuliah', 'SKS'],
                        colWidths: [16, 18, 5]
                    });
                    table.push(
                        [`${row.id_mata_kuliah}`, `${row.nama_mata_kuliah}`, `${row.sks}`]
                    );
                    console.log(table.toString());
                    mataKuliah();
                } else {
                    console.log(`Mata kuliah dengan ID ${id_mata_kuliah} tidak terdaftar`);
                    cariMataKuliah();
                }
            })
        })
    })
}

function tambahMataKuliah() {
    console.log('Lengkapi data di bawah ini:');
    rl.question('ID Mata Kuliah: ', (id_mata_kuliah) => {
        rl.question('Nama Mata Kuliah: ', (nama_mata_kuliah) => {
            rl.question('SKS: ', (sks) => {
                console.log(`================================================`);

                db.serialize(() => {
                    let sqltambahMataKuliah = `INSERT INTO mata_kuliah (id_mata_kuliah, nama_mata_kuliah, sks) 
                            VALUES (${id_mata_kuliah}, '${nama_mata_kuliah}', ${sks})`
                    db.run(sqltambahMataKuliah, (err) => {
                        if (err) throw err;
                        let sqltampildata = `SELECT * FROM mata_kuliah;`
                        db.all(sqltampildata, (err, row) => {
                            if (err) throw err;
                            if (row) {
                                console.log('Jurusan telah berhasil ditambahkan!')
                                var table = new Table({
                                    head: ['ID Mata Kuliah', 'Nama Mata Kuliah', 'SKS'],
                                    colWidths: [16, 18, 5]
                                });
                                row.forEach((item) => {
                                    table.push(
                                        [`${item.id_mata_kuliah}`, `${item.nama_mata_kuliah}`, `${item.sks}`]
                                    );
                                })
                                console.log(table.toString());
                                mataKuliah();
                            } else {
                                tambahMataKuliah();
                            }
                        })
                    })
                })
            })
        })
    })
}

function hapusMataKuliah() {
    rl.question(`================================================
Masukkan ID mata kuliah yang akan dihapus: `, (id_mata_kuliah) => {
        console.log(`================================================`)

        db.serialize(() => {
            let sqlhapusMataKuliah = `DELETE FROM mata_kuliah
            WHERE id_mata_kuliahn = ${id_mata_kuliah}`
            console.log(`Jurusan dengan ID: ${id_mata_kuliah} telah berhasil dihapus!`);
            db.run(sqlhapusMataKuliah, (err) => {
                if (err) throw err;

                let sqldaftarMataKuliah = `SELECT * FROM mata_kuliah;`
                db.all(sqldaftarMataKuliah, (err, row) => {
                    if (err) throw err;
                    if (row) {
                        var table = new Table({
                            head: ['ID Mata Kuliah', 'Nama Mata Kuliah', 'SKS'],
                            colWidths: [16, 18, 5]
                        });
                        row.forEach((item) => {
                            table.push(
                                [`${item.id_mata_kuliah}`, `${item.nama_mata_kuliah}`, `${item.sks}`]
                            );
                        });
                        console.log(table.toString());
                        mataKuliah();
                    } else {
                        console.log('Data tidak ditemukkan!');
                        hapusMataKuliah();
                    }
                })
            })
        })
    })
}

function kontrak() {
    console.log(`================================================
silahkan pilih opsi di bawah ini
[1] Daftar kontrak
[2] Cari kontrak
[3] Tambah kontrak
[4] Hapus kontrak
[5] Kembali
================================================`);
    rl.question('masukkan salah satu no. dari opsi di atas:', (number) => {
        switch (number) {
            case '1':
                daftarKontrak()
                break;
            case '2':
                cariKontrak()
                break;
            case '3':
                tambahKontrak()
                break;
            case '4':
                hapusKontrak()
                break;
            case '5':
                mainMenu()
                break;
            default:
                console.log('Mohon pilih no. di atas!');
                mainMenu();
                break;
        }
    });
}

function daftarKontrak() {
    db.serialize(() => {
        console.log(`================================================`)
        let sqldaftarKontrak = `SELECT * FROM kontrak;`
        db.all(sqldaftarKontrak, (err, row) => {
            if (err) throw err;
            if (row) {
                var table = new Table({
                    head: ['ID Kontrak', 'Nilai', 'NIM', 'ID Mata Kuliah', 'NIP']
                    , colWidths: [12, 7, 9, 16, 9]
                });
                row.forEach((item) => {
                    table.push(
                        [`${item.id_kontrak}`, `${item.nilai}`, `${item.nim}`, `${item.id_mata_kuliah}`, `${item.nip_dosen}`]
                    );
                });
                console.log(table.toString());
                kontrak();
            } else {
                console.log(`Data tidak ditemukan!`);
                daftarKontrak();
            }
        })
    })
}

function cariKontrak() {
    console.log(`================================================`)
    rl.question('Masukkan ID Kontrak: ', (id_kontrak) => {
        console.log(`================================================`)
        db.serialize(() => {
            let sqlcariKontrak = `SELECT * FROM kontrak
            WHERE id_kontrak = ${id_kontrak};`
            db.get(sqlcariKontrak, (err, row) => {
                if (err) throw err;
                if (row) {
                    var table = new Table({
                        head: ['ID Kontrak', 'Nilai', 'NIM', 'ID Mata Kuliah', 'NIP'],
                        colWidths: [12, 7, 9, 16, 9]
                    });
                    table.push(
                        [`${row.id_kontrak}`, `${row.nilai}`, `${row.nim}`, `${row.id_mata_kuliah}`, `${row.nip_dosen}`]
                    );
                    console.log(table.toString());
                    kontrak();
                } else {
                    console.log(`Kontrak dengan ID: ${id_kontrak} tidak terdaftar`);
                    cariKontrak();
                }
            })
        })
    })
}

function tambahKontrak() {
    console.log('Lengkapi data di bawah ini:')
    rl.question('ID Kontrak: ', (id_kontrak) => {
        rl.question('Nilai: ', (nilai) => {
            rl.question('NIM: ', (nim) => {
                rl.question('ID Mata Kuliah: ', (id_mata_kuliah) => {
                    rl.question('NIP: ', (nip_dosen) => {
                        console.log(`================================================`);

                        db.serialize(() => {
                            let sqltambahKontrak = `INSERT INTO kontrak (id_kontrak, nilai, nim, id_mata_kuliah, nip_dosen)
                            VALUES (${id_kontrak}, '${nilai}', ${nim}, ${id_mata_kuliah}, ${nip_dosen})`
                            db.run(sqltambahKontrak, (err) => {
                                if (err) throw err;

                                let sqltampildata = `SELECT * FROM kontrak;`
                                db.all(sqltampildata, (err, row) => {
                                    if (err) throw err;
                                    if (row) {
                                        console.log('Kontrak telah berhasil ditambahkan!');
                                        var table = new Table({
                                            head: ['ID Kontrak', 'Nilai', 'NIM', 'ID Mata Kuliah', 'NIP'],
                                            colWidths: [12, 7, 9, 16, 9]
                                        });
                                        row.forEach((item) => {
                                            table.push(
                                                [`${item.id_kontrak}`, `${item.nilai}`, `${item.nim}`, `${item.id_mata_kuliah}`, `${item.nip_dosen}`]
                                            );
                                        });
                                        console.log(table.toString());
                                        kontrak();
                                    } else {
                                        tambahKontrak();
                                    }
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

function hapusKontrak() {
    rl.question(`================================================
Masukkan ID kontrak yang akan dihapus: `, (id_kontrak) => {
        console.log(`================================================`)
        db.serialize(() => {
            let sqlhapusKontrak = `DELETE FROM kontrak
            WHERE id_kontrak = ${id_kontrak};`
            console.log(`Kontrak dengan ID: ${id_kontrak} telah dihapus!`);
            db.run(sqlhapusKontrak, (err) => {
                if (err) throw err;

                let sqldaftarKontrak = `SELECT * FROM kontrak;`
                db.all(sqldaftarKontrak, (err, row) => {
                    if (err) throw err;
                    if (row) {
                        var table = new Table({
                            head: ['ID Kontrak', 'Nilai', 'NIM', 'ID Mata Kuliah', 'NIP'],
                            colWidths: [12, 7, 9, 16, 9]
                        });
                        row.forEach((item) => {
                            table.push(
                                [`${item.id_kontrak}`, `${item.nilai}`, `${item.nim}`, `${item.id_mata_kuliah}`, `${item.nip_dosen}`]
                            );
                        });
                        console.log(table.toString());
                        kontrak();
                    } else {
                        console.log(`Data tidak ditemukan!`);
                    }
                })
            })
        })
    })
}

login();