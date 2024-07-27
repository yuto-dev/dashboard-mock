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
    "Kabupaten Banggai", "Kabupaten Banggai Kepulauan", "Kabupaten Banggai Laut", "Kabupaten Buol",
    "Kabupaten Donggala", "Kabupaten Morowali", "Kabupaten Morowali Utara", "Kabupaten Parigi Moutong",
    "Kabupaten Poso", "Kabupaten Sigi", "Kabupaten Tojo Una-Una", "Kabupaten Tolitoli",
    "Kota Palu"
]

# SQL statement to insert a row
insert_query = """
INSERT INTO kabupatenMasterDetail (provinsiID, kabupatenkota)
VALUES (%s, %s);
"""

# Execute the insert query for each kabupatenkota
for kabupaten in kabupatenkota_values:
    cur.execute(insert_query, (25, kabupaten))

print(len(kabupatenkota_values), "rows inserted.")

# Commit the transaction
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()

print("Data inserted successfully.")