import requests
from bs4 import BeautifulSoup

def fact_check(search_term):
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

    print(cleaned_urls)


    # links = ""
    # # Find all <a> elements within <div class="tF2Cxc"> and print their href attribute
    # for paragraph in soup.find_all('cite'):
    #     links += paragraph.get_text()
    # print(soup)

if __name__ == '__main__':
    fact_check("is the earth flat")
