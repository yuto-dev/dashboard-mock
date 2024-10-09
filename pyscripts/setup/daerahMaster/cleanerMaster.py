import csv

def retain_first_three_columns(input_csv, output_csv):
    with open(input_csv, 'r', newline='', encoding='utf-8') as infile:
        reader = csv.reader(infile, delimiter=';')
        with open(output_csv, 'w', newline='', encoding='utf-8') as outfile:
            writer = csv.writer(outfile, delimiter=';')
            for row in reader:
                # Write only the first three columns
                writer.writerow(row[:3])

if __name__ == "__main__":
    input_csv = 'daerah_master.csv'  # Replace with your input CSV file path
    output_csv = 'output.csv'  # Replace with your desired output CSV file path
    retain_first_three_columns(input_csv, output_csv)
    print(f"Processed CSV saved as {output_csv}")
