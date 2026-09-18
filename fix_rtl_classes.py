import os
import re
import glob

def replace_classes_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Define replacements with word boundaries to avoid partial matches
    # Use (?<=[\s"'\`]) to match start of class name in string/template literal
    # Or just use \b but be careful with hyphens
    
    replacements = [
        (r'\bml-', 'ms-'),
        (r'\bmr-', 'me-'),
        (r'\bpl-', 'ps-'),
        (r'\bpr-', 'pe-'),
        (r'\btext-left\b', 'text-start'),
        (r'\btext-right\b', 'text-end'),
        (r'\bleft-', 'start-'),
        (r'\bright-', 'end-'),
        (r'\bborder-l-', 'border-s-'),
        (r'\bborder-r-', 'border-e-'),
        (r'\bspace-x-', 'space-x-'), # Note: Tailwind handles space-x automatically with logical properties in v4, or we can use rtl:space-x-reverse in v3.
    ]
    
    new_content = content
    for pattern, repl in replacements:
        # Regex to only replace if preceded by space, quote, backtick, etc.
        # It's safer to use \b because Tailwind classes are hyphenated words.
        # For left-0, \bleft-0 will match.
        new_content = re.sub(pattern, repl, new_content)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated classes in {filepath}")

def main():
    # Find all .jsx files
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith('.jsx'):
                replace_classes_in_file(os.path.join(root, file))

if __name__ == '__main__':
    main()
