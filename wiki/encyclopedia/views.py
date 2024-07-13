from django.shortcuts import render, redirect
from django import forms

from . import util

import markdown2

import random


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
       
        context = {
            "title": page_name,
            "html_content": html_content,
        }
        return render(request, 'encyclopedia/content.html', context)
    else:
        return render(request, 'encyclopedia/nonexist.html')
    
def search_res(request):
    """
    Returns the query from the form in layout.html. Check for matches case insensitive
    to redirect ot relevant page. If none are found continue to search for substrings -
    if there are such Search_results page with list similar to index is called. If there
    are no matches - nonexist.html is called.
    """
    query = request.GET.get("q", "")
    entries = util.list_entries()

    matched_entry = next((entry for entry in entries if query.lower() == entry.lower()), None)

    if matched_entry:
        return redirect('page_view', page_name=matched_entry)
    else:
        relevant_entries = [entry for entry in entries if query.lower() in entry.lower()]

        if relevant_entries:
            relevant_entries.sort()
            return render(request, 'encyclopedia/search_results.html', {
                "entries": relevant_entries
            } )
        else:
            return render(request, 'encyclopedia/nonexist.html')

class PageForm(forms.Form):
    """
    Use default Django form.
    """
    title = forms.CharField(label="Title", max_length=100)
    content = forms.CharField(label="Content", widget=forms.Textarea(attrs={"style": "width: 600px; height: 200px;"}))

def create_page(request):
    """
    Receive information from both labels - title and content. Checks if the form is populated, then checks
    if the title matches any other entries.
    """
    if request.method == "POST":
        form = PageForm(request.POST)
        if form.is_valid():
            title = form.cleaned_data["title"]
            content = form.cleaned_data["content"]

            if util.entry_exists(title):
                error_message = "The title already exists. Please choose a different title."
                return render(request, 'encyclopedia/create_page.html', {'form': form, 'error_message': error_message})

            else:
                util.save_entry(title, content)
                return redirect('page_view', page_name=title)
        else:
            return render(request, 'encyclopedia/create_page.html', {'form': form})
    else:
        form = PageForm()
        return render(request, 'encyclopedia/create_page.html', {'form': form})
    
def edit_page(request, page_name):
    """
    Use this function for both GET and POST method. Post method is when info is submitted
    through the form for the save_entry. Get is when the edit page is initialy visualized
    when one is being redirected from content.html.
    """
    if request.method == "POST":
        content = request.POST.get('content', '')
        if content:
            util.save_entry(page_name, content)
            return redirect("page_view", page_name=page_name)
        else:
            existing_content = util.get_entry(page_name)
            return render(request, 'encyclopedia/edit_page.html', {
                "title": page_name,
                "content": existing_content,
                "error_message": "Content cannot be empty."
            })

    elif request.method == "GET":
        content = util.get_entry(page_name)
        if content:
            context = {
                "title": page_name,
                "content": content
            }
            return render(request, 'encyclopedia/edit_page.html', context)
        else:
            return render(request, 'encyclopedia/nonexist.html', {
                "title": page_name
            })
            

def random_page(request):
    entries = util.list_entries()
    random_page = random.choice(entries)
    return redirect("page_view", page_name=random_page)