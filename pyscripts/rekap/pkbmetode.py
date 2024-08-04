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
CREATE TABLE IF NOT EXISTS pkbmetode (
    kabupaten NUMERIC,
    tahun NUMERIC,
    jeniskendaraan CHAR(1),
    jumlahonline NUMERIC,
    jumlahoffline NUMERIC,
    nilaionline NUMERIC,
    nilaioffline NUMERIC
);
"""

# Execute the create table query
cur.execute(create_table_query)

# Generate and insert data
years = range(2014, 2025)  # Years from 2014 to 2024
vehicle_types = ['A', 'B', 'C', 'D', 'E', 'F']
kabupaten = 39

# Dictionaries to keep track of the previous year's values for each vehicle type
previous_jumlahonline = {vehicle_type: random.randint(100, 500) for vehicle_type in vehicle_types}
previous_jumlahoffline = {vehicle_type: random.randint(100, 500) for vehicle_type in vehicle_types}

for year in years:
    for vehicle_type in vehicle_types:
        # Ensure jumlahonline and jumlahoffline increase each year
        jumlahonline = previous_jumlahonline[vehicle_type] + random.randint(50, 150)
        jumlahoffline = previous_jumlahoffline[vehicle_type] + random.randint(50, 150)
        
        # Generate other random values for each column
        nilaionline = random.randint(1000000, 10000000)
        nilaioffline = random.randint(1000000, 10000000)
        
        # SQL statement to insert a row
        insert_query = """
        INSERT INTO pkbmetode (
            kabupaten, tahun, jeniskendaraan, jumlahonline, jumlahoffline, 
            nilaionline, nilaioffline
        ) VALUES (%s, %s, %s, %s, %s, %s, %s);
        """
        
        # Execute the insert query with the generated values
        cur.execute(insert_query, (
            kabupaten, year, vehicle_type, jumlahonline, jumlahoffline, 
            nilaionline, nilaioffline
        ))
        
        # Update the previous year's values for this vehicle type
        previous_jumlahonline[vehicle_type] = jumlahonline
        previous_jumlahoffline[vehicle_type] = jumlahoffline

# Commit the transaction
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()

print("Data inserted successfully.")
