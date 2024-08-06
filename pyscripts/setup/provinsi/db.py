import csv
import psycopg2

# Database connection parameters
db_params = {
    'dbname': 'depdagri',
    'user': 'abi',
    'password': 'abi',
    'host': 'localhost',
    'port': '5432'
}

# Path to your modified CSV file
csv_file_path = 'newdata.csv'

# Create a connection to the PostgreSQL database
try:
    connection = psycopg2.connect(**db_params)
    cursor = connection.cursor()

    # Create the provinsi table with an auto-increment ID column
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS provinsi (
        id SERIAL PRIMARY KEY,
        nomor VARCHAR(10),
        data VARCHAR(50),
        daerah VARCHAR(100),
        status VARCHAR(50),
        anggaranPKB VARCHAR(50),
        realisasiPKB VARCHAR(50),
        persentasePKB VARCHAR(10),
        anggaranBBNKB VARCHAR(50),
        realisasiBBNKB VARCHAR(50),
        persentaseBBNKB VARCHAR(10)
    )
    ''')
    connection.commit()

    # Read the CSV file and insert data into the table
    with open(csv_file_path, newline='', encoding='utf-8') as csvfile:
        csvreader = csv.reader(csvfile, delimiter=';')

        for row in csvreader:
            # Ensure row has the correct number of columns
            if len(row) == 10:
                nomor = row[0].strip()
                data = row[1].strip()
                daerah = row[2].strip()
                status = row[3].strip()
                anggaranPKB = row[4].strip()
                realisasiPKB = row[5].strip()
                persentasePKB = row[6].strip()
                anggaranBBNKB = row[7].strip()
                realisasiBBNKB = row[8].strip()
                persentaseBBNKB = row[9].strip()

                cursor.execute('''
                INSERT INTO provinsi (
                    nomor, data, daerah, status,
                    anggaranPKB, realisasiPKB, persentasePKB,
                    anggaranBBNKB, realisasiBBNKB, persentaseBBNKB
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ''', (
                    nomor, data, daerah, status,
                    anggaranPKB, realisasiPKB, persentasePKB,
                    anggaranBBNKB, realisasiBBNKB, persentaseBBNKB
                ))
                print(f"Inserted row: {nomor}, {data}, {daerah}, {status}, {anggaranPKB}, {realisasiPKB}, {persentasePKB}, {anggaranBBNKB}, {realisasiBBNKB}, {persentaseBBNKB}")

    connection.commit()

except Exception as e:
    print("Error while processing the CSV file or database operation")
    print(e)
finally:
    if connection:
        cursor.close()
        connection.close()
