import psycopg2
import random

# Database connection parameters - update these with your details
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

# SQL statement to create the table if it doesn't exist
create_table_query = """
CREATE TABLE IF NOT EXISTS newpkbrekap (
    tahun NUMERIC,
    kabupaten NUMERIC,
    jeniskendaraan CHAR(1),
    jumlahkendaraan NUMERIC,
    kendaraanbayar NUMERIC,
    target NUMERIC,
    realisasi NUMERIC,
    jumlahkendaraantidakbayar5tahun NUMERIC,
    jumlahkendaraantidakbayar7tahun NUMERIC,
    nilaikendaraantidakbayar5tahun NUMERIC,
    nilaikendaraantidakbayar7tahun NUMERIC
);
"""

# Execute the create table query
cur.execute(create_table_query)

# Generate and insert data
years = range(2014, 2025)  # Years from 2014 to 2024
vehicle_types = ['A', 'B', 'C', 'D', 'E', 'F']
kabupaten = 39

# Dictionary to keep track of the previous year's jumlahkendaraan for each vehicle type
previous_values = {vehicle_type: random.randint(1000, 2000) for vehicle_type in vehicle_types}

for year in years:
    for vehicle_type in vehicle_types:
        # Ensure jumlahkendaraan increases each year
        jumlahkendaraan = previous_values[vehicle_type] + random.randint(100, 500)
        
        # Generate other random values for each column
        kendaraanbayar = random.randint(500, jumlahkendaraan)
        target = random.randint(8000000000, 10000000000)
        realisasi = random.randint(8000000000, 10000000000)
        jumlahkendaraantidakbayar5tahun = random.randint(0, 1000)
        jumlahkendaraantidakbayar7tahun = random.randint(0, 500)
        nilaikendaraantidakbayar5tahun = random.randint(1000000, 10000000)
        nilaikendaraantidakbayar7tahun = random.randint(1000000, 10000000)
        
        # SQL statement to insert a row
        insert_query = """
        INSERT INTO newpkbrekap (
            tahun, kabupaten, jeniskendaraan, jumlahkendaraan, kendaraanbayar, target, realisasi, 
            jumlahkendaraantidakbayar5tahun, jumlahkendaraantidakbayar7tahun, 
            nilaikendaraantidakbayar5tahun, nilaikendaraantidakbayar7tahun
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
        """
        
        # Execute the insert query with the generated values
        cur.execute(insert_query, (
            year, kabupaten, vehicle_type, jumlahkendaraan, kendaraanbayar, target, realisasi, 
            jumlahkendaraantidakbayar5tahun, jumlahkendaraantidakbayar7tahun, 
            nilaikendaraantidakbayar5tahun, nilaikendaraantidakbayar7tahun
        ))
        
        # Update the previous year's jumlahkendaraan for this vehicle type
        previous_values[vehicle_type] = jumlahkendaraan

# Commit the transaction
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()

print("Data inserted successfully.")
