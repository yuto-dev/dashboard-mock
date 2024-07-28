import psycopg2

# Reuse the database connection parameters
db_params = {
    'dbname': 'depdagri',
    'user': 'abi',
    'password': 'abi',
    'host': 'localhost',
    'port': '5432'
}

# Connect to your database
conn = psycopg2.connect(**db_params)

# Create a cursor object
cur = conn.cursor()

# SQL statement to create the kabupatenMasterDetail table
create_table_query = """
CREATE TABLE IF NOT EXISTS kabupatenMasterDetail (
    kabupatenID SERIAL PRIMARY KEY,
    provinsiID NUMERIC,
    kabupatenkota VARCHAR(255)
);
"""

# Execute the create table query
cur.execute(create_table_query)

provinsiList = []

# List of kabupatenkota values to insert
aceh = [
    "Kabupaten Aceh Barat", "Kabupaten Aceh Barat Daya", "Kabupaten Aceh Besar",
    "Kabupaten Aceh Jaya", "Kabupaten Aceh Selatan", "Kabupaten Aceh Singkil",
    "Kabupaten Aceh Tamiang", "Kabupaten Aceh Tengah", "Kabupaten Aceh Tenggara",
    "Kabupaten Aceh Timur", "Kabupaten Aceh Utara", "Kabupaten Bener Meriah",
    "Kabupaten Bireuen", "Kabupaten Gayo Lues", "Kabupaten Nagan Raya",
    "Kabupaten Pidie", "Kabupaten Pidie Jaya", "Kabupaten Simeulue",
    "Kota Banda Aceh", "Kota Langsa", "Kota Lhokseumawe", "Kota Sabang",
    "Kota Subulussalam"
]

sumateraUtara = [
    "Kabupaten Asahan", "Kabupaten Batu Bara", "Kabupaten Dairi",
    "Kabupaten Deli Serdang", "Kabupaten Humbang Hasundutan", "Kabupaten Karo",
    "Kabupaten Labuhanbatu", "Kabupaten Labuhanbatu Selatan", "Kabupaten Labuhanbatu Utara",
    "Kabupaten Langkat", "Kabupaten Mandailing Natal", "Kabupaten Nias",
    "Kabupaten Nias Barat", "Kabupaten Nias Selatan", "Kabupaten Nias Utara",
    "Kabupaten Padang Lawas", "Kabupaten Padang Lawas Utara", "Kabupaten Pakpak Bharat",
    "Kabupaten Samosir", "Kabupaten Serdang Bedagai", "Kabupaten Simalungun", "Kabupaten Tapanuli Selatan",
    "Kabupaten Tapanuli Tengah", "Kabupaten Tapanuli Utara", "Kabupaten Toba", "Kota Binjai",
    "Kota Gunungsitoli", "Kota Medan", "Kota Padangsidimpuan", "Kota Pematangsiantar",
    "Kota Sibolga", "Kota Tanjungbalai", "Kota Tebing Tinggi"
]

sumateraBarat = [
    "Kabupaten Agam", "Kabupaten Dharmasraya", "Kabupaten Kepulauan Mentawai",
    "Kabupaten Lima Puluh Kota", "Kabupaten Padang Pariaman", "Kabupaten Pasaman",
    "Kabupaten Pasaman Barat", "Kabupaten Pesisir Selatan", "Kabupaten Sijunjung",
    "Kabupaten Solok", "Kabupaten Solok Selatan", "Kabupaten Tanah Datar",
    "Kota Bukittinggi", "Kota Padang", "Kota Padang Panjang", "Kota Pariaman",
    "Kota Payakumbuh", "Kota Sawahlunto", "Kota Solok"
]

riau = [
    "Kabupaten Bengkalis", "Kabupaten Indragiri Hilir", "Kabupaten Indragiri Hulu",
    "Kabupaten Kampar", "Kabupaten Kepulauan Meranti", "Kabupaten Kuantan Singingi",
    "Kabupaten Pelalawan", "Kabupaten Rokan Hilir", "Kabupaten Rokan Hulu",
    "Kabupaten Siak", "Kota Dumai", "Kota Pekanbaru"
]

kepulauanRiau = [
    "Kabupaten Bintan", "Kabupaten Karimun", "Kabupaten Kepulauan Anambas", "Kabupaten Lingga",
    "Kabupaten Natuna", "Kota Batam", "Kota Tanjungpinang"
]

jambi = [
    "Kabupaten Batanghari", "Kabupaten Bungo", "Kabupaten Kerinci", "Kabupaten Merangin",
    "Kabupaten Muaro Jambi", "Kabupaten Sarolangun", "Kabupaten Tanjung Jabung Barat",
    "Kabupaten Tanjung Jabung Timur", "Kabupaten Tebo", "Kota Jambi",
    "Kota Sungai Penuh"
]

bengkulu = [
    "Kabupaten Bengkulu Selatan", "Kabupaten Bengkulu Tengah", "Kabupaten Bengkulu Utara",
    "Kabupaten Kaur", "Kabupaten Kepahiang", "Kabupaten Lebong", "Kabupaten Mukomuko", "Kabupaten Rejang Lebong",
    "Kabupaten Seluma", "Kota Bengkulu"
]

sumateraSelatan = [
    "Kabupaten Banyuasin", "Kabupaten Empat Lawang", "Kabupaten Lahat", "Kabupaten Muara Enim",
    "Kabupaten Musi Banyuasin", "Kabupaten Musi Rawas", "Kabupaten Musi Rawas Utara", 
    "Kabupaten Ogan Ilir", "Kabupaten Ogan Komering Ilir", "Kabupaten Ogan Komering Ulu",
    "Kabupaten Ogan Komering Ulu Selatan", "Kabupaten Ogan Komering Ulu Timur", "Kabupaten Penukal Abab Lematang Ilir",
    "Kota Lubuk Linggau", "Kota Pagaralam", "Kota Palembang", "Kota Prabumulih"
]

kepulauanBangkaBelitung = [
    "Kabupaten Bangka", "Kabupaten Bangka Barat", "Kabupaten Bangka Selatan", "Kabupaten Bangka Tengah",
    "Kabupaten Belitung", "Kabupaten Belitung Timur", "Kota Pangkalpinang"
]

lampung = [
    "Kabupaten Lampung Barat", "Kabupaten Lampung Selatan", "Kabupaten Lampung Tengah", "Kabupaten Lampung Timur",
    "Kabupaten Lampung Utara", "Kabupaten Mesuji", "Kabupaten Pesawaran", "Kabupaten Pesisir Barat", 
    "Kabupaten Pringsewu", "Kabupaten Tanggamus", "Kabupaten Tulang Bawang", 
    "Kabupaten Tulang Bawang Barat", "Kabupaten Way Kanan",
    "Kota Bandar Lampung", "Kota Metro"
]

jakarta = [
    "Kabupaten Administrasi Kepulauan Seribu", "Kota Administrasi Jakarta Barat", 
    "Kota Administrasi Jakarta Pusat", "Kota Administrasi Jakarta Selatan",
    "Kota Administrasi Jakarta Timur", "Kota Administrasi Jakarta Utara"
]

jawaBarat = [
    "Kabupaten Bandung", "Kabupaten Bandung Barat", "Kabupaten Bekasi", "Kabupaten Bogor",
    "Kabupaten Ciamis", "Kabupaten Cianjur", "Kabupaten Cirebon", "Kabupaten Garut",
    "Kabupaten Indramayu", "Kabupaten Karawang", "Kabupaten Kuningan", "Kabupaten Majalengka",
    "Kabupaten Pangandaran", "Kabupaten Purwakarta", "Kabupaten Subang", "Kabupaten Sukabumi",
    "Kabupaten Sumedang", "Kabupaten Tasikmalaya", "Kota Bandung", "Kota Banjar",
    "Kota Bekasi", "Kota Bogor", "Kota Cimahi", "Kota Cirebon", "Kota Depok",
    "Kota Sukabumi", "Kota Tasikmalaya"
]

banten = [
    "Kabupaten Lebak", "Kabupaten Pandeglang", "Kabupaten Serang", "Kabupaten Tangerang",
    "Kota Cilegon", "Kota Serang", "Kota Tangerang", "Kota Tangerang Selatan"
]

jawaTengah = [
    "Kabupaten Banjarnegara", "Kabupaten Banyumas", "Kabupaten Batang", "Kabupaten Blora",
    "Kabupaten Boyolali", "Kabupaten Brebes", "Kabupaten Cilacap", "Kabupaten Demak",
    "Kabupaten Grobogan", "Kabupaten Jepara", "Kabupaten Karanganyar", "Kabupaten Kebumen",
    "Kabupaten Kendal", "Kabupaten Klaten", "Kabupaten Kudus", "Kabupaten Magelang",
    "Kabupaten Pati", "Kabupaten Pekalongan", "Kabupaten Pemalang", "Kabupaten Purbalingga",
    "Kabupaten Purworejo", "Kabupaten Rembang", "Kabupaten Semarang", "Kabupaten Sragen",
    "Kabupaten Sukoharjo", "Kabupaten Tegal", "Kabupaten Temanggung", "Kabupaten Wonogiri",
    "Kabupaten Wonosobo", "Kota Magelang", "Kota Pekalongan", "Kota Salatiga",
    "Kota Semarang", "Kota Surakarta", "Kota Tegal"
]

yogyakarta = [
    "Kabupaten Bantul", "Kabupaten Gunungkidul", "Kabupaten Kulon Progo", "Kabupaten Sleman",
    "Kota Yogyakarta"
]

jawaTimur = [
    "Kabupaten Bangkalan", "Kabupaten Banyuwangi", "Kabupaten Blitar", "Kabupaten Bojonegoro",
    "Kabupaten Bondowoso", "Kabupaten Gresik", "Kabupaten Jember", "Kabupaten Jombang",
    "Kabupaten Kediri", "Kabupaten Lamongan", "Kabupaten Lumajang", "Kabupaten Madiun",
    "Kabupaten Magetan", "Kabupaten Malang", "Kabupaten Mojokerto", "Kabupaten Nganjuk",
    "Kabupaten Ngawi", "Kabupaten Pacitan", "Kabupaten Pamekasan", "Kabupaten Pasuruan",
    "Kabupaten Ponorogo", "Kabupaten Probolinggo", "Kabupaten Sampang", "Kabupaten Sidoarjo",
    "Kabupaten Situbondo", "Kabupaten Sumenep", "Kabupaten Trenggalek", "Kabupaten Tuban",
    "Kabupaten Tulungagung", "Kota Batu", "Kota Blitar", "Kota Kediri", "Kota Madiun",
    "Kota Malang", "Kota Mojokerto", "Kota Pasuruan", "Kota Probolinggo", "Kota Surabaya"
]

kalimantanBarat = [
    "Kabupaten Bengkayang", "Kabupaten Kapuas Hulu", "Kabupaten Kayong Utara", "Kabupaten Ketapang",
    "Kabupaten Kubu Raya", "Kabupaten Landak", "Kabupaten Melawi", "Kabupaten Mempawah",
    "Kabupaten Sambas", "Kabupaten Sanggau", "Kabupaten Sekadau", "Kabupaten Sintang",
    "Kota Pontianak", "Kota Singkawang"
]

kalimantanTengah = [
    "Kabupaten Barito Selatan", "Kabupaten Barito Timur", "Kabupaten Barito Utara", "Kabupaten Gunung Mas",
    "Kabupaten Kapuas", "Kabupaten Katingan", "Kabupaten Kotawaringin Barat", "Kabupaten Kotawaringin Timur",
    "Kabupaten Lamandau", "Kabupaten Murung Raya", "Kabupaten Pulang Pisau", 
    "Kabupaten Seruyan", "Kabupaten Sukamara", "Kota Palangkaraya"
]

kalimantanSelatan = [
    "Kabupaten Balangan", "Kabupaten Banjar", "Kabupaten Barito Kuala", "Kabupaten Hulu Sungai Selatan",
    "Kabupaten Hulu Sungai Tengah", "Kabupaten Hulu Sungai Utara", "Kabupaten Kotabaru", "Kabupaten Tabalong",
    "Kabupaten Tanah Bumbu", "Kabupaten Tanah Laut", "Kabupaten Tapin", "Kota Banjarbaru", "Kota Banjarmasin"
]

kalimantanTimur = [
    "Kabupaten Berau", "Kabupaten Kutai Barat", "Kabupaten Kutai Kartanegara", "Kabupaten Kutai Timur",
    "Kabupaten Mahakam Ulu", "Kabupaten Paser", "Kabupaten Penajam Paser Utara",
    "Kota Balikpapan", "Kota Bontang", "Kota Samarinda"
]

kalimantanUtara = [
    "Kabupaten Bulungan", "Kabupaten Malinau", "Kabupaten Nunukan", "Kabupaten Tana Tidung", "Kota Tarakan"
]

sulawesiBarat = [
    "Kabupaten Majene", "Kabupaten Mamasa", "Kabupaten Mamuju", "Kabupaten Mamuju Tengah", 
    "Kabupaten Pasangkayu", "Kabupaten Polewali Mandar"
]

sulawesiUtara = [
    "Kabupaten Bolaang Mongondow", "Kabupaten Bolaang Mongondow Selatan", "Kabupaten Bolaang Mongondow Timur",
    "Kabupaten Bolaang Mongondow Utara", "Kabupaten Kepulauan Sangihe", "Kaupaten Kepulauan Siau Tagulandang Biaro",
    "Kabupaten Kepulauan Talaud", "Kabupaten Minahasa", "Kabupaten Minahasa Selatan", "Kabupaten Minahasa Tenggara",
    "Kabupaten Minahasa Utara", "Kota Bitung", "Kota Kotamobagu", "Kota Manado", "Kota Tomohon"
]

gorontalo = [
    "Kabupaten Boalemo", "Kabupaten Bone Bolango", "Kabupaten Gorontalo", "Kabupaten Gorontalo Utara",
    "Kabupaten Pohuwato", "Kota Gorontalo"
]

sulawesiTengah = [
    "Kabupaten Banggai", "Kabupaten Banggai Kepulauan", "Kabupaten Banggai Laut", "Kabupaten Buol",
    "Kabupaten Donggala", "Kabupaten Morowali", "Kabupaten Morowali Utara", "Kabupaten Parigi Moutong",
    "Kabupaten Poso", "Kabupaten Sigi", "Kabupaten Tojo Una-Una", "Kabupaten Tolitoli",
    "Kota Palu"
]

sulawesiSelatan = [
    "Kabupaten Bantaeng", "Kabupaten Barru", "Kabupaten Bone", "Kabupaten Bulukumba",
    "Kabupaten Enrekang", "Kabupaten Gowa", "Kabupaten Jeneponto", "Kabupaten Keppulauan Selayar",
    "Kabupaten Luwu", "Kabupaten Luwu Timur", "Kabupaten Luwu Utara", "Kabupaten Maros",
    "Kabupaten Pangkajene dan Kepulauan", "Kabupaten Pinrang", "Kabupaten Sidenreng Rappang",
    "Kabupaten Sinjai", "Kabupaten Soppeng", "Kabupaten Takalar", "Kabupaten Tana Toraja",
    "Kabupaten Toraja Utara", "Kabupaten Wajo", "Kota Makassar", "Kota Palopo", "Kota Parepare"
]

sulawesiTenggara = [
    "Kabupaten Bombana", "Kabupaten Buton", "Kabupaten Buton Selatan", 
    "Kabupaten Buton Tengah", "Kabupaten Buton Utara", "Kabupaten Kolaka",
    "Kabupaten Kolaka Timur", "Kabupaten Kolaka Utara", "Kabupaten Konawe",
    "Kabupaten Konawe Kepulauan", "Kabupaten Konawe Selatan", "Kabupaten Konawe Utara",
    "Kabupaten Muna", "Kabupaten Muna Barat", "Kabupaten Wakatobi", "Kota Baubau",
    "Kota Kendari"
]

bali = [
    "Kabupaten Badung", "Kabupaten Bangli", "Kabupaten Buleleng", "Kabupaten Gianyar",
    "Kabupaten Jembrana", "Kabupaten Karangasem", "Kabupaten Klungkung", "Kabupaten Tabanan",
    "Kota Denpasar"
]

ntb = [
    "Kabupaten Bima", "Kabupaten Dompu", "Kabupaten Lombok Barat", "Kabupaten Lombok Tengah",
    "Kabupaten Lombok Timur", "Kabupaten Lombok Utara", "Kabupaten Sumbawa", "Kabupaten Sumbawa Barat",
    "Kota Bima", "Kota Mataram"
]

ntt = [
    "Kabupaten Alor", "Kabupaten Belu", "Kabupaten Ende", "Kabupaten Flores Timur",
    "Kabupaten Kupang", "Kabupaten Lembata", "Kabupaten Malaka", "Kabupaten Manggarai",
    "Kabupaten Manggarai Barat", "Kabupaten Manggarai Timur", "Kabupaten Nagekeo", "Kabupaten Ngada",
    "Kabupaten Rote Ndao", "Kabupaten Sabu Raijua", "Kabupaten Sikka", "Kabupaten Sumba Barat",
    "Kabupaten Sumba Barat Daya", "Kabupaten Sumba Tengah", "Kabupaten Sumba Timur", "Kabupaten Timor Tengah Selatan",
    "Kabupaten Timor Tengah Utara", "Kota Kupang"
]

papua = [
    "Kabupaten Biak Numfor", "Kabupaten Jayapura", "Kabupaten Keerom", "Kabupaten Kepulauan Yapen",
    "Kabupaten Mamberamo Raya", "Kabupaten Sarmi", "Kabupaten Supiori", "Kabupaten Waropen", "Kota Jayapura"
]

papuaBarat = [
    "Kabupaten Fakfak", "Kabupaten Kaimana", "Kabupaten Manokwari", "Kabupaten Manokwari Selatan",
    "Kabupaten Pegunungan Arfak", "Kabupaten Teluk Bintuni", "Kabupaten Teluk Wondama"
]

papuaBaratDaya = [
    "Kabupaten Maybrat", "Kabupaten Raja Ampat", "Kabupaten Sorong", "Kabupaten Sorong Selatan",
    "Kabupaten Tambrauw", "Kota Sorong"
]

papuaTengah = [
    "Kabupaten Deiyai", "Kabupaten Dogiyai", "Kabupaten Intan Jaya", "Kabupaten Mimika",
    "Kabupaten Nabire", "Kabupaten Paniai", "Kabupaten Puncak", "Kabupaten Puncak Jaya"
]

papuaPegunungan = [
    "Kabupaten Jayawijaya", "Kabupaten Lanny Jaya", "Kabupaten Mamberamo Tengah", "Kabupaten Nduga",
    "Kabupaten Pegunungan Binntang", "Kabupaten Tolikara", "Kabupaten Yalimo", "Kabupaten Yahukimo"
]

papuaSelatan = [
    "Kabupaten Asmat", "Kabupaten Boven Digoel", "Kabupaten Mappi", "Kabupaten Merauke"
]

provinsiList.append(aceh)
provinsiList.append(sumateraUtara)
provinsiList.append(sumateraBarat)
provinsiList.append(riau)
provinsiList.append(kepulauanRiau)
provinsiList.append(jambi)
provinsiList.append(bengkulu)
provinsiList.append(sumateraSelatan)
provinsiList.append(kepulauanBangkaBelitung)
provinsiList.append(lampung)
provinsiList.append(jakarta)
provinsiList.append(jawaBarat)
provinsiList.append(banten)
provinsiList.append(jawaTengah)
provinsiList.append(yogyakarta)
provinsiList.append(jawaTimur)
provinsiList.append(kalimantanBarat)
provinsiList.append(kalimantanTengah)
provinsiList.append(kalimantanSelatan)
provinsiList.append(kalimantanTimur)
provinsiList.append(kalimantanUtara)
provinsiList.append(sulawesiBarat)
provinsiList.append(sulawesiUtara)
provinsiList.append(gorontalo)
provinsiList.append(sulawesiTengah)
provinsiList.append(sulawesiSelatan)
provinsiList.append(sulawesiTenggara)
provinsiList.append(bali)
provinsiList.append(ntb)
provinsiList.append(ntt)
provinsiList.append(papua)
provinsiList.append(papuaBarat)
provinsiList.append(papuaBaratDaya)
provinsiList.append(papuaTengah)
provinsiList.append(papuaPegunungan)
provinsiList.append(papuaSelatan)



# SQL statement to insert a row
insert_query = """
INSERT INTO kabupatenMasterDetail (provinsiID, kabupatenkota)
VALUES (%s, %s);
"""

counter = 1

# Execute the insert query for each kabupatenkota
for provinsi in provinsiList:
    for kabupaten in provinsi:
        cur.execute(insert_query, (counter, kabupaten))
        
    counter += 1

# Commit the transaction
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()

print("Data inserted successfully.")