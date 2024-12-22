

document.addEventListener('DOMContentLoaded', () => {
    // This ensures that the code inside the event listener runs after the HTML document has been fully loaded.

    const searchInput = document.getElementById('search');
    // This selects the input element with the id 'search' and assigns it to the variable searchInput.

    const dropdownList = document.getElementById('dropdown-list');
    // This selects the ul element with the id 'dropdown-list' and assigns it to the variable dropdownList.

    const dataSections = document.getElementById('data-sections');
    // This selects the div element with the id 'data-sections' and assigns it to the variable dataSections.

    const pageType = document.documentElement.getAttribute('data-page-type'); //important for search 
    // This gets the value of the 'data-page-type' attribute from the <html> tag and assigns it to the variable pageType.

    console.log('Page Type:', pageType);
    // This logs the current page type to the console for debugging purposes.

    let allData = [];
    // This initializes an empty array to store combined data from both the 'index' and 'about' pages.

    let pageData = [];
    // This initializes an empty array to store data specific to the current page type.

    fetch('data.json')
        .then(response => response.json())
        // This fetches data from 'data.json' and converts the response to a JSON object.

        .then(data => {
            console.log('Fetched Data:', data);
            // This logs the fetched data to the console for debugging purposes.

            pageData = data[pageType];
            // This assigns the data corresponding to the current page type (either 'index' or 'about') to pageData.

            allData = [...data.index, ...data.about];
            // This combines data from both 'index' and 'about' pages into allData.

            console.log('Page Data:', pageData);
            // This logs the data for the current page to the console for debugging purposes.

            console.log('All Data:', allData);
            // This logs the combined data from both pages to the console for debugging purposes.

            if (pageData) {
                displaySections(pageData);
                // This calls the displaySections function to display sections for the current page data.

                searchInput.addEventListener('input', () => {
                    const searchTerm = searchInput.value.toLowerCase();
                    // This gets the current value of the search input, converts it to lowercase, and assigns it to searchTerm.

                    const filteredData = allData.filter(item => 
                        item.name.toLowerCase().includes(searchTerm) || 
                        item.email.toLowerCase().includes(searchTerm)
                    );
                    // This filters the combined data to include only items where the name or email contains the search term.

                    displayDropdown(filteredData);
                    // This calls the displayDropdown function to display the filtered search results.
                });

                document.addEventListener('click', (event) => {
                    if (!dropdownList.contains(event.target) && event.target !== searchInput) {
                        dropdownList.style.display = 'none';
                    }
                    // This hides the dropdown list if the user clicks outside of it or the search input.
                });
            } else {
                console.error('Page data is undefined. Check the data-page-type attribute and JSON structure.');
                // This logs an error if the page data is undefined.
            }
        })
        .catch(error => console.error('Error fetching JSON:', error));
        // This logs an error if there is an issue fetching the JSON data.

    function displaySections(data) {
        dataSections.innerHTML = '';
        // This clears the inner HTML of the dataSections div.

        data.forEach(item => {
            const section = document.createElement('section');
            section.id = `section-${item.id}`;
            section.innerHTML = `<h2>${item.name}</h2><p>Email: ${item.email}</p>`;
            dataSections.appendChild(section);
            // This creates a new section element for each item in the data array and appends it to the dataSections div.
        });
    }

    function displayDropdown(data) {
        dropdownList.innerHTML = '';
        // This clears the inner HTML of the dropdownList ul.

        if (data.length > 0) {
            dropdownList.style.display = 'block';
            // This makes the dropdown list visible if there is data to display.

            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - ${item.email}`;
                li.addEventListener('click', () => {
                    const sectionId = `section-${item.id}`;
                    const section = document.getElementById(sectionId);
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        window.location.href = `${pageType === 'index' ? 'about.html' : 'index.html'}#${sectionId}`;
                    }
                    dropdownList.style.display = 'none';
                    searchInput.value = '';
                    // This creates a new list item for each item in the data array, adds a click event to scroll to the corresponding section, or navigate to the other page if the section is not found on the current page. It then hides the dropdown list and clears the search input.
                });
                dropdownList.appendChild(li);
                // This appends the list item to the dropdown list.
            });
        } else {
            dropdownList.style.display = 'none';
            // This hides the dropdown list if there is no data to display.
        }
    }
});
