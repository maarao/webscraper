import re
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse

def fact_check(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    h1_elements = soup.find_all('h1')

    if h1_elements:
        # Remove special characters from the title
        search_term = re.sub(r'[^\w\s]', '', h1_elements[0].text.strip())
    else:
        search_term = ""


    base_url = "https://www.google.com/search?q="
    formatted_term = '+'.join(search_term.split())
    search = base_url + formatted_term

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
    response = requests.get(search, headers=headers)

    soup = BeautifulSoup(response.text, 'html.parser')
    result_links = soup.find_all('a', href=True)
    search_result_urls = [link['href'] for link in result_links]
    filtered_urls = [link for link in search_result_urls if "&url=https:" in link or "&url=http:" in link]

    cleaned_urls = []

    for url in filtered_urls:
        start_index = url.find("url=")
        if start_index != -1:
            start_index += 4  # Move to the character after "url="
            end_index = url.find("&", start_index)
            if end_index != -1:
                cleaned_url = url[start_index:end_index]
                cleaned_urls.append(cleaned_url)
            else:
                cleaned_urls.append(url[start_index:])
        else:
            cleaned_urls.append(url)

    base_urls = [urlparse(url).netloc for url in cleaned_urls]
    filtered_urls = [url.replace('www.', '') if url.startswith('www.') else url for url in base_urls]

    count_good = 0

    trusted = ['bbc.com', 'reuters.com', 'apnews.com', 'npr.org', 'pbs.org', 'nytimes.com', 'washingtonpost.com', 'wsj.com', 'economist.com', 'bbc.co.uk', 'dw.com', 'france24.com', 'theguardian.com', 'abcnews.go.com', 'cbsnews.com', 'nbcnews.com', 'cnn.com', 'msnbc.com', 'foxnews.com', 'bloomberg.com', 'forbes.com', 'theatlantic.com', 'newyorker.com', 'slate.com', 'politico.com', 'timesofindia.indiatimes.com', 'theglobeandmail.com', 'lemonde.fr']

    for url in filtered_urls:
        if url in trusted:
            count_good += 1

    return count_good

if __name__ == '__main__':
    url = "https://www.theglobeandmail.com/arts/article-vatican-indigenous-items-repatriation/"
    print(fact_check(url))
