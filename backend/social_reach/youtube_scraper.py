import requests
from bs4 import BeautifulSoup
from random import choice
import json

_user_agents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1944.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36'
]

class YoutubeScraper:

    def __init__(self, user_agents=_user_agents, proxy=None):
        self.user_agents = user_agents
        self.proxy = proxy

    def __random_agent(self):
        if self.user_agents and isinstance(self.user_agents, list):
            return choice(self.user_agents)
        return choice(_user_agents)


    def __request_url(self, url):
        try:
            self.__random_agent()
            print("URL", url)
            response = requests.get(url, headers={'User-Agent': self.__random_agent()}, proxies={'http': self.proxy,
                                                                                                 'https': self.proxy})
            response.raise_for_status()
        except requests.HTTPError:
            return response.text
        except requests.RequestException:
            raise requests.RequestException
        else:
            return response.text

    @staticmethod
    def extract_json_data(html):
        soup = BeautifulSoup(html, 'html.parser')
        count_data = soup.find('span', class_='yt-subscription-button-subscriber-count-branded-horizontal subscribed yt-uix-tooltip')
        print("COUNT DATA", count_data)
        if count_data is not None:
            count = count_data["title"]
            print("YOUTUBE count:", count)
            print("PRE-FORMATTED COUNT TYPE", type(count))
            formatted_count = count.replace(',', '')
            int_count = int(formatted_count)
            return int_count
        else:
            return 0

    def scrape_youtube_followers(self, youtube_handle):
        results = None
        try:
            response = self.__request_url("https://www.youtube.com/user/" + youtube_handle)
            json_data = self.extract_json_data(response)
            followers = json_data
            # followers = json_data[0]
            print("followers",followers)
        except Exception as e:
            raise e
        else:
            results = followers
            # for key, value in metrics.items():
            #     if key != 'edge_owner_to_timeline_media':
            #         if value and isinstance(value, dict):
            #             value = value['count']
            #             results[key] = value
            #         elif value:
            #             results[key] = value
        return results

    def profile_page_recent_posts(self, profile_url):
        results = []
        try:
            response = self.__request_url(profile_url)
            json_data = self.extract_json_data(response)
            metrics = json_data
        except Exception as e:
            raise e
        else:
            for node in metrics:
                node = node.get('node')
                if node and isinstance(node, dict):
                    results.append(node)
        return results








def get_youtube_subs():
    b = soup.find(id="subscriber-count")
    print("subscribers:", b)

    # for i in b:
    #     try:
    #         value = i.b.text.strip().replace(',','')
    #         if len(b) == 3:
    #             f.write(value+',')
    #             print('\t%s') %(value)
    #         elif len(b) == 2:
    #             f.write('null,'+ value + ',')
    #             print('\tsubs = null\n\t%s') %(value)
    #         else:
    #             f.write('null,null,')
    #             print('\tsubs = null\nviews = null')
    #     except AttributeError:
            # pass
