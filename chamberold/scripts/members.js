// --- Setup Variables ---

// Declare a const variable named "membersURL" that contains the string of the JSON resource provided.
const membersURL = './data/members.json';

// Declare a const variable name "cards" that selects the HTML div element from the document with an id value of "member-container".
// NOTE: We use 'member-container' as defined in your directory.html
const cards = document.querySelector('#member-container');

// Membership level mapping for text and styling (retained from original plan)
const membershipLevels = {
    1: 'Non-Profit/Basic Member',
    2: 'Silver Membership',
    3: 'Gold Membership'
};


// --- Second Part: Display Function ---

// Define a function expression named "displayMembers" that handles a single parameter named "members"
const displayMembers = (members) => {
    // Clear the container before loading new content
    cards.innerHTML = '';

    members.forEach((member) => {
        // Determine the appropriate class for the membership level color
        const levelClass = `level-${member.membershiplevel}`;
        const levelText = membershipLevels[member.membershiplevel] || 'Associate Member';

        // Create elements to add to the container
        let card = document.createElement('section');
        card.classList.add('member-card');

        // --- Create Elements and Populate Data ---

        let memberName = document.createElement('h3'); // Using h3 for semantics
        let image = document.createElement('img');
        let level = document.createElement('span'); // Span for membership level
        let address = document.createElement("p");
        let phoneNumber = document.createElement("p");
        let websiteURL = document.createElement("p");

        // Build the h3 content (Corrected field name to 'name')
        memberName.textContent = member.name;

        // Build the image portrait (Corrected field name to 'imagefile')
        image.setAttribute('src', `images/${member.imagefile}`);
        image.setAttribute('alt', `Logo of ${member.name}`);
        image.setAttribute('loading', 'lazy');
        image.classList.add('member-logo');

        // Build the p content (Corrected field names)
        address.textContent = `Address: ${member.address}`;
        phoneNumber.textContent = `Phone: ${member.phone}`; // Corrected field name

        // Create link for website URL
        websiteURL.innerHTML = `Website: <a href="${member.website}" target="_blank">${member.website.replace('https://www.', '')}</a>`; // Corrected field name

        // Membership Level
        level.textContent = levelText;
        level.classList.add('membership-level', levelClass);

        // Append the section(card) with the created elements
        card.appendChild(image);
        card.appendChild(memberName);
        card.appendChild(address);
        card.appendChild(phoneNumber);
        card.appendChild(websiteURL);
        card.appendChild(level);

        cards.appendChild(card);
    });
}


// --- First Part: Fetch Function ---

// Create a async defined function named "getMembers" to fetch data from the JSON source url using the await fetch() method.
async function getMembers(membersURL) {
    try {
        // use await fetch() method get response from the URL
        const response = await fetch(membersURL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Use "await response.json()" phase the response body as JSON format and store the results in a const variable named "data".
        const data = await response.json();

        // Add a console.table() expression method to check the data response at this point in the console window.
        console.table(data.members);

        // Call displayMembers() with the members array (data.members is the array of companies)
        displayMembers(data.members);

    } catch (error) {
        console.error('Error fetching member data:', error);
        cards.innerHTML = '<p style="text-align: center; color: red;">Failed to load business directory data. Check console for details.</p>';
    }
}


// --- View Toggle Logic (using correct IDs and CSS classes) ---

// Select the buttons using the IDs from directory.html
const gridbutton = document.querySelector("#grid-view-btn");
const listbutton = document.querySelector("#list-view-btn");

// Apply the default grid view class immediately
cards.classList.add("directory-grid");

gridbutton.addEventListener("click", () => {
    // Toggles the container to display as a Grid
    cards.classList.add("directory-grid");
    cards.classList.remove("directory-list");
});

listbutton.addEventListener("click", () => {
    // Toggles the container to display as a List
    cards.classList.add("directory-list");
    cards.classList.remove("directory-grid");
});


// Call the function getMembers() in the main line of your .js code to test the fetch and response.
getMembers(membersURL);
