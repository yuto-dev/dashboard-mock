def write_string_to_file_n_times(n, string, filename):
    """
    Writes the specified string n times to a file.

    Parameters:
    n (int): The number of times to write the string.
    string (str): The string to write.
    filename (str): The name of the file to write to.
    """
    with open(filename, 'w') as file:
        file.write((string * n).strip(','))

# Example usage
n = 97
string = "%s,"
filename = "output.txt"
write_string_to_file_n_times(n, string, filename)

print(f"The string has been written to {filename}")
