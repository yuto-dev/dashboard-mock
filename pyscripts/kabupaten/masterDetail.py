import subprocess

# List of Python scripts to run in order
scripts = [
    './sumatera/aceh.py',
    './sumatera/sumateraUtara.py',
    './sumatera/sumateraBarat.py',
    './sumatera/riau.py',
    './sumatera/kepulauanRiau.py',
    './sumatera/jambi.py',
    './sumatera/bengkulu.py',
    './sumatera/sumateraSelatan.py',
    './sumatera/kepulauanBangkaBelitung.py',
    './sumatera/lampung.py'
    './jawa/jakarta.py',
    './jawa/jawaBarat.py',
    './jawa/banten.py',
    './jawa/jawaTengah.py',
    './jawa/yogyakarta.py',
    './jawa/jawaTimur.py',
    './kalimantan/kalimantanBarat.py',
    './kalimantan/kalimantanTengah.py',
    './kalimantan/kalimantanSelatan.py',
    './kalimantan/kalimantanTimur.py',
    './kalimantan/kalimantanUtara.py',
    './sulawesi/sulawesiBarat.py',
    './sulawesi/sulawesiUtara.py',
    './sulawesi/gorontalo.py',
    './sulawesi/sulawesiTengah.py',
    './sulawesi/sulawesiSelatan.py',
    './sulawesi/sulawesiTenggara.py',
    './kepulauan/bali.py',
    './kepulauan/ntb.py',
    './kepulauan/ntt.py',
    './maluku/maluku.py',
    './maluku/malukuUtara.py'
    './papua/papua.py',
    './papua/papuaBarat.py',
    './papua/papuaBaratDaya.py',
    './papua/papuaTengah.py',
    './papua/papuaPegunungan.py',
    './papua/papuaSelatan.py'
]

for script in scripts:
    try:
        print(f"Running {script}...")
        result = subprocess.run(['python', script], capture_output=True, text=True)
        print(f"Output of {script}:\n{result.stdout}")
        if result.stderr:
            print(f"Error in {script}:\n{result.stderr}")
        print(f"Finished {script}.\n")
    except Exception as e:
        print(f"Failed to run {script}: {e}")

print("All scripts have been executed.")
