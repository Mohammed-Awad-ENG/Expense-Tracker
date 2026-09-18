import os
import re

files_with_unused_t = [
    "src/components/Model.jsx",
    "src/components/cards/InfoCard.jsx",
    "src/components/cards/TransactionsInfoCard.jsx",
    "src/components/charts/CustomBarChart.jsx",
    "src/components/charts/CustomLegend.jsx",
    "src/components/charts/CustomPieChart.jsx",
    "src/components/inputs/Input.jsx",
    "src/components/layouts/AuthLayout.jsx",
    "src/components/layouts/DashboardLayout.jsx"
]

def remove_unused_t():
    for f_path in files_with_unused_t:
        with open(f_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove `const { t } = useTranslation();`
        content = re.sub(r'const\s*{\s*t\s*}\s*=\s*useTranslation\(\)\s*;\s*\n', '', content)
        
        # Remove import useTranslation if it's the only import from react-i18next
        content = re.sub(r'import\s*{\s*useTranslation\s*}\s*from\s*["\']react-i18next["\'];\s*\n', '', content)

        with open(f_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
    # Fix LanguageSwitcher
    ls_path = "src/components/LanguageSwitcher.jsx"
    with open(ls_path, 'r', encoding='utf-8') as f:
        ls_content = f.read()
    ls_content = re.sub(r'import\s+React\s+from\s+[\'"]react[\'"];\s*\n', '', ls_content)
    with open(ls_path, 'w', encoding='utf-8') as f:
        f.write(ls_content)

if __name__ == "__main__":
    remove_unused_t()
