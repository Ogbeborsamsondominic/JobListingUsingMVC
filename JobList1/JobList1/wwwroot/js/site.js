const listsContainer = document.querySelector(".lists");
const filterList = document.querySelector(".filter-list");
const filterListContainer = document.querySelector(".filter-list .filters");
const clearButtonFilters = document.querySelector("button");

async function loadJobsData() {
    try {
        const response = await fetch('./jobs.json'); 
        const jobsData = await response.json();

        createData(jobsData);
    } catch (error) {
        console.error('Error:', error);
    }
}

function createData(array) {
    listsContainer.innerHTML = "";

    array.forEach(item => {
        const list = document.createElement("div");
        list.classList.add("list");

        if (item.new && item.featured) {
            list.classList.add("on-the-top");
        }

        const description = document.createElement("div");
        description.classList.add("description");

        const img = document.createElement("img");
        img.src = item.logo;
        img.alt = `${item.company.toLowerCase()} image`;
        description.appendChild(img);

        const details = document.createElement("div");
        details.classList.add("details");

        const company = document.createElement("div");
        company.classList.add("company");
        company.appendChild(document.createTextNode(item.company));

        if (item.new) {
            const spanNew = document.createElement("span");
            spanNew.classList.add("new");
            spanNew.appendChild(document.createTextNode("new"));
            company.appendChild(spanNew);
        }

        if (item.featured) {
            const spanFeatured = document.createElement("span");
            spanFeatured.classList.add("featured");
            spanFeatured.appendChild(document.createTextNode("featured"));
            company.appendChild(spanFeatured);
        }

        details.appendChild(company);

        const h3 = document.createElement("h3");
        h3.classList.add("position");
        h3.appendChild(document.createTextNode(item.position));
        details.appendChild(h3);

        const time = document.createElement("div");
        time.classList.add("time");

        const spanPostedAt = document.createElement("span");
        spanPostedAt.classList.add("posted-at");
        spanPostedAt.appendChild(document.createTextNode(item.postedAt));
        time.appendChild(spanPostedAt);

        const spanContract = document.createElement("span");
        spanContract.classList.add("contract");
        spanContract.appendChild(document.createTextNode(item.contract));
        time.appendChild(spanContract);

        const spanLocation = document.createElement("span");
        spanLocation.classList.add("location");
        spanLocation.appendChild(document.createTextNode(item.location));
        time.appendChild(spanLocation);

        details.appendChild(time);
        description.appendChild(details);
        list.appendChild(description);

        const stats = document.createElement("div");
        stats.classList.add("stats");

        const createSpan = (dataName, value) => {
            const span = document.createElement("span");
            span.setAttribute(`data-${dataName}-${value}`, value);
            span.appendChild(document.createTextNode(value));
            list.setAttribute(`data-${dataName}-${value}`, value);
            return span;
        };

        stats.appendChild(createSpan("role", item.role));
        stats.appendChild(createSpan("level", item.level));

        item.languages.forEach(language => {
            stats.appendChild(createSpan("languages", language));
        });

        item.tools.forEach(tool => {
            stats.appendChild(createSpan("tools", tool));
        });

        list.appendChild(stats);
        listsContainer.appendChild(list);
    });

    filtersClick();
    checkFilters();
}

window.onload = () => {
    loadJobsData();
    localStorage.clear();
};

function filtersClick() {
    const tags = document.querySelectorAll(".list .stats span");
    tags.forEach(tag => {
        tag.onclick = () => {
            if (!filterListContainer.hasAttribute(tag.attributes[0].name)) {
                const attrName = tag.attributes[0].name;
                const attrValue = tag.attributes[0].value;
                filterListContainer.setAttribute(attrName, attrValue);

                const span = document.createElement("span");
                const cancel = document.createElement("button");

                span.appendChild(document.createTextNode(attrValue));
                span.appendChild(cancel);
                span.setAttribute(attrName, attrValue);

                filterListContainer.appendChild(span);
                checkFilters();
                cancel.onclick = () => {
                    span.classList.add("can");
                    setTimeout(() => {
                        span.remove();
                        filterListContainer.removeAttribute(span.attributes[0].name);
                        checkFilters();
                        loadJobsData(true);
                    }, 300);
                };

                loadJobsData(true);
            }
        };
    });
}

function checkFilters() {
    filterList.classList.toggle("show-list", filterListContainer.innerHTML !== "");
}

clearButtonFilters.onclick = () => {
    while (filterListContainer.attributes.length > 1) {
        filterListContainer.removeAttribute(filterListContainer.attributes[1].name);
    }

    const spans = document.querySelectorAll(".filters span");
    spans.forEach(span => span.classList.add("vanish"));

    setTimeout(() => {
        filterListContainer.innerHTML = "";
        checkFilters();
        loadJobsData();
    }, 1000);
};
