import os   # import os create the path to the md files 

from django.shortcuts import render

from django.conf import settings  # import settings to use the root of the filestructure 

from . import util

import markdown2


def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

# getting the md file to read the content
def get_md_content(filename):
    filepath = os.path.join(settings.BASE_DIR, "entries", filename)
    with open(filepath, "r", encoding="utf-8") as file:
        content = file.read()
    return content


# create a dic with the md page content - need to get title, header and the rest of the body content
def page_view(request, page_name):
    content = get_md_content(f"{page_name}.md")
    html_content = markdown2.markdown(content)
    title = page_name
    context = {
        "title": title,
        "html_content": html_content,
    }
    return render(request, 'encyclopedia/content.html', context)

