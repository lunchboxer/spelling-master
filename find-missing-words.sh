#!/bin/bash

# Usage info
if [ $# -ne 2 ]; then
	echo "Usage: $0 <spelling_list> <glossary>"
	exit 1
fi

# Get arguments
spelling_list=$1
glossary=$2

# Get words from spelling list
list_words=$(grep -E '^[0-9]+\. ([[:alpha:]]+)$' "$spelling_list" | awk '{print $2}' | sort)

# Get words from glossary
glossary_words=$(grep -E '^([[:alpha:]]+)' "$glossary" | awk '{print $1}' | sort)

# Check spelling list against glossary
missing_list=()
for word in $list_words; do
	if ! grep -q "^$word" "$glossary"; then
		missing_list+=("$word")
	fi
done

# Check glossary against spelling list
missing_glossary=()
for word in $glossary_words; do
	if ! grep -q "$word" "$spelling_list"; then
		missing_glossary+=("$word")
	fi
done

# Print output
echo
echo "Words in $spelling_list missing in $glossary:"
if [ ${#missing_list[@]} -eq 0 ]; then
	echo "None missing"
else
	for word in "${missing_list[@]}"; do
		echo "- $word"
	done
fi

echo
echo "Words in $glossary missing in $spelling_list:"
if [ ${#missing_glossary[@]} -eq 0 ]; then
	echo "None missing"
else
	for word in "${missing_glossary[@]}"; do

		echo "- $word"
	done
fi
echo
