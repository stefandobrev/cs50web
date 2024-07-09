import re

from django.shortcuts import render, redirect

from . import util

import markdown2


def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def page_view(request, page_name):
    """
    Get the title from get_entry, which gets title from page_name
    from urls.py. Create a dictionary with the title and 
    the converted content. Return 404 if title doesn't match entries.
    """
    content = util.get_entry(page_name)
    if content:
        html_content = markdown2.markdown(content)

        match = re.search(r'^# (.+)', content, re.MULTILINE)
        header = match.group(1) if match else 'Default Title'
        
        context = {
            "title": header,
            "html_content": html_content,
        }
        return render(request, 'encyclopedia/content.html', context)
    else:
        return render(request, 'encyclopedia/nonexist.html')
    