import PyPDF2
import sys

def extract_text(pdf_path):
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            with open('resume.txt', 'w', encoding='utf-8') as out:
                for page in reader.pages:
                    out.write(page.extract_text() + "\n")
                print("Extracted to resume.txt")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    extract_text("GOKULRAMMS.pdf")
