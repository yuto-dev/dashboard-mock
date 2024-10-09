import psycopg2
import random
import csv

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

# Create the table if it doesn't exist
create_table_query = """
CREATE TABLE IF NOT EXISTS formatpkbrekap (
    id_daerah CHAR(3),
    kode_prop CHAR(2),
    kode_kab CHAR(2),
    bulan NUMERIC,
    tahun NUMERIC,
    jenis_kendaraan CHAR(1),
    jenis_kepemilikan CHAR(1),
    jumlah_kendaraan NUMERIC,
    jumlah_kendaraan_bayar NUMERIC,
    nominal_kendaraan_tidak_bayar NUMERIC,
    jumlah_pembayaran_online NUMERIC,
    nominal_pembayaran_online NUMERIC,
    jumlah_pembayaran_offline NUMERIC,
    nominal_pembayaran_offline NUMERIC,
    nominal_menunggak_1tahun NUMERIC,
    jumlah_menunggak_5tahun NUMERIC,
    nominal_menunggak_5tahun NUMERIC,
    jumlah_menunggak_7tahun NUMERIC,
    nominal_menunggak_7tahun NUMERIC,
    jumlah_menunggak_5tahun_kebawah NUMERIC,
    jumlah_menunggak_5tahun_keatas NUMERIC,
    nominal_menunggak_5tahun_kebawah NUMERIC,
    nominal_menunggak_5tahun_keatas NUMERIC
);
"""
# Execute the create table query
cur.execute(create_table_query)

# Read from the CSV file
with open('output.csv', 'r', newline='', encoding='utf-8') as csvfile:
    reader = csv.reader(csvfile, delimiter=';')
    next(reader)  # Skip the header row if present

    # Loop through each row in the CSV
    for row in reader:
        daerah, prop, kabupaten = row  # Unpack the values from the current row
        print(daerah, prop, kabupaten)
        # Generate and insert data
        months = range(1, 13)
        years = range(2014, 2025)  # Years from 2014 to 2024
        vehicle_types = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q']
        ownership_types = ['A', 'B', 'C', 'D']

        previous_values = {vehicle_type: random.randint(1000, 2000) for vehicle_type in vehicle_types}

        for year in years:
            for month in months:
                for vehicle_type in vehicle_types:
                    for ownership_type in ownership_types:
                        
                        jumlah_kendaraan = previous_values[vehicle_type] + random.randint(100, 500)
                        
                        # Generate other random values for each column
                        kendaraan_bayar = random.randint(500, jumlah_kendaraan)
                        nominal_tidak_bayar = random.randint(8000000000, 10000000000)
                        
                        jumlah_pembayaran_online = previous_values[vehicle_type] + random.randint(100, 500)
                        nominal_pembayaran_online = random.randint(8000000000, 10000000000)
                        jumlah_pembayaran_offline = previous_values[vehicle_type] + random.randint(100, 500)
                        nominal_pembayaran_offline = random.randint(8000000000, 10000000000)
                        
                        nominal_menunggak_1tahun = random.randint(1000000, 10000000)
                        jumlah_menunggak_5tahun = random.randint(0, 1000)
                        nominal_menunggak_5tahun = random.randint(1000000, 10000000)
                        jumlah_menunggak_7tahun = random.randint(0, 500)
                        nominal_menunggak_7tahun = random.randint(1000000, 10000000)
                        jumlah_menunggak_5tahun_kebawah = random.randint(0, 1000)
                        jumlah_menunggak_5tahun_keatas = random.randint(0, 500)
                        nominal_menunggak_5tahun_kebawah = random.randint(1000000, 10000000)
                        nominal_menunggak_5tahun_keatas = random.randint(1000000, 10000000)
                        
                        insert_query = """
                        INSERT INTO formatpkbrekap (
                            id_daerah,
                            kode_prop,
                            kode_kab,
                            bulan,
                            tahun,
                            jenis_kendaraan,
                            jenis_kepemilikan,
                            jumlah_kendaraan,
                            jumlah_kendaraan_bayar,
                            nominal_kendaraan_tidak_bayar,
                            jumlah_pembayaran_online,
                            nominal_pembayaran_online,
                            jumlah_pembayaran_offline,
                            nominal_pembayaran_offline,
                            nominal_menunggak_1tahun,
                            jumlah_menunggak_5tahun,
                            nominal_menunggak_5tahun,
                            jumlah_menunggak_7tahun,
                            nominal_menunggak_7tahun,
                            jumlah_menunggak_5tahun_kebawah,
                            jumlah_menunggak_5tahun_keatas,
                            nominal_menunggak_5tahun_kebawah,
                            nominal_menunggak_5tahun_keatas
                        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
                        """
                        
                        # Execute the insert query with the generated values
                        cur.execute(insert_query, (
                            daerah, prop, kabupaten, month, year, vehicle_type, ownership_type, jumlah_kendaraan, 
                            kendaraan_bayar, nominal_tidak_bayar, jumlah_pembayaran_online, nominal_pembayaran_online,
                            jumlah_pembayaran_offline, nominal_pembayaran_offline, nominal_menunggak_1tahun,
                            jumlah_menunggak_5tahun, nominal_menunggak_5tahun, jumlah_menunggak_7tahun, nominal_menunggak_7tahun,
                            jumlah_menunggak_5tahun_kebawah, jumlah_menunggak_5tahun_keatas, nominal_menunggak_5tahun_kebawah,
                            nominal_menunggak_5tahun_keatas
                        ))

                        # Update the previous year's jumlahkendaraan for this vehicle type
                        previous_values[vehicle_type] = jumlah_kendaraan
                        
# Commit the transaction
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()

print("Data inserted successfully.")
