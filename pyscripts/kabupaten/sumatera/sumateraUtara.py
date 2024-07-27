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

# List of kabupatenkota values to insert
kabupatenkota_values = [
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

# SQL statement to insert a row
insert_query = """
INSERT INTO kabupatenMasterDetail (provinsiID, kabupatenkota)
VALUES (%s, %s);
"""

# Execute the insert query for each kabupatenkota
for kabupaten in kabupatenkota_values:
    cur.execute(insert_query, (2, kabupaten))

print(len(kabupatenkota_values), "rows inserted.")

# Commit the transaction
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()

print("Data inserted successfully.")