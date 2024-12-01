import os
from pathlib import Path

def combine_src_files(src_path="src", output_file="combined_src.txt"):
    # Convert to absolute path
    src_dir = Path(src_path).absolute()
    
    if not src_dir.exists():
        print(f"Error: {src_path} directory not found!")
        return
    
    with open(output_file, 'w', encoding='utf-8') as outfile:
        # Walk through all files in src directory
        for file_path in src_dir.rglob('*'):
            if file_path.is_file():
                try:
                    # Get relative path for cleaner output
                    rel_path = file_path.relative_to(src_dir)
                    
                    # Write file header
                    outfile.write(f"\n{'='*50}\n")
                    outfile.write(f"File: {rel_path}\n")
                    outfile.write(f"{'='*50}\n\n")
                    
                    # Write file contents
                    with open(file_path, 'r', encoding='utf-8') as infile:
                        outfile.write(infile.read())
                    outfile.write('\n')
                    
                    print(f"Added: {rel_path}")
                except Exception as e:
                    print(f"Skipped {rel_path}: {str(e)}")

if __name__ == "__main__":
    combine_src_files()
    print("\nDone! Check combined_src.txt for the output.")