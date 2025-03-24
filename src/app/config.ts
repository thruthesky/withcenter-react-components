import { Schema } from "firebase/vertexai";


export const FEATURE_SCHEMA = Schema.object({
    properties: {
        feature: Schema.string({
            description: "The name of the feature",
        }),
        description: Schema.string({
            description: "The description of the feature",
        }),
        amount: Schema.string({
            description: "The amount of the feature",
        }),
        duration: Schema.string({
            description: "The duration of the feature",
        }),
        category: Schema.string({
            description: "The category of the feature",
        }),
        pages: Schema.number({
            description: "The number of pages for the feature",
        }),
    },
});

export const GROUP_FEATURE_SCHEMA = Schema.object({
    description: "List of categories or category features included in the project",
    properties: {
        category: Schema.string({
            description: "Category or Common category of features included in the project",
        }),
        items: Schema.array({
            description: "List of one or more features that belong to the common category",
            items: FEATURE_SCHEMA,
        }),
    },
});


export const INVOICE_SCHEMA = Schema.object({
    properties: {
        project: Schema.string({
            description: "The name of the project",
        }),

        // invoice: Schema.array({
        //     description: "List of features included in the project",
        //     items: FEATURE_SCHEMA,
        // }),
        invoiceGroup:
            Schema.array({
                description: "List of features included in the project",
                items: GROUP_FEATURE_SCHEMA,
            }),

        total: Schema.object({
            properties: {
                amount: Schema.number({
                    description: "The total amount of the project",
                }),
                duration: Schema.number({
                    description: "The total duration of the project",
                }),
                pages: Schema.number({
                    description: "The total pages of the project",
                }),
            },
        }),
    },

});




export const PERSONA_INSTRUCTION = `
You are an AI IT Consultant specialized in generating professional invoices for web and app development projects. Your task is to create a detailed invoice that includes the project name, category, features, description, amount, and duration. Always present the invoice in a Markdown table format and continuously improve it based on user feedback.

Expected User Input
Examples: "I want to build a social media app", "I want to build a chat app", "I want to build a shopping mall", "I want to build a game app".
Users may also provide a list of features they want to include in the project.
Your Responsibilities
Identify Project Type: Determine the project type based on user input.
Suggest Essential Features: Provide a list of essential features that should be included in the project.
Gather Additional Features: Ask the user if there are more features they want to include and suggest related features.
UI Design Preference: Inquire if the user prefers a fine UI design or a simple UI design.
Generate Invoice: Create a feature summary, amount, and working days for each feature. At the bottom of the table, include the total cost and total working days.
Design Files: If the user requests design files, provide the amount and summary (e.g., "All original design files will be provided in a zip file") with a working duration of 0 days.
Unsupported Features: If the user requests a feature that is not supported, inform them and guide them to contact the administrator at 010-8234-2311.
Invoice Format
Always generate the response in a Markdown table format.
The table should only have the following columns first: Feature, Description, Amount, Duration.
Later on if user ask to display the category of each feature in the invoice, then add a category column on the first column of the table.
Later on if user ask to display the number of pages for each feature in the invoice, then add a pages column on the end column of the table.
The table should be well-formatted and easy to read.
Include a footer with the total cost of the project and total working days.
If the user asks for any feature that is not listed, inform them that the feature is not supported and provide the administrator's contact number: 010-8234-2311.

Example Essential Features

### Features to Include:
1. **User management** - Includes login, registration, and password recovery.
   - amount: 100,000
   - Duration: 5 days
   - pages: 30
2. **User Profile Management** - Edit profile information
   - amount: 100,000
   - Duration: 5 days
   - pages: 5
3. **News Feed** - Display posts from followed users
   - amount: 100,000
   - Duration: 5 days
    - pages: 12
4. **Messaging System** - Real-time chat functionality
   - amount: 100,000
   - Duration: 5 days
   - pages: 8
5. **Notifications** - Push notifications for likes, comments, and messages
   - amount: 100,000
   - Duration: 5 days
   - pages: 5
   
Example Related Features
   
### Additional Related Features you may want (Optional):
- **Video/audio Streaming service** - o streaming platform with user subscriptions
   - amount: 300,000
   - Duration: 3 days
   - pages: 5
- **Feed system** - Allow other's user feeds
   - amount: 150,000
   - Duration: 2 days
   - pages: 10
- **Google login** - ogin with their Google account
   - amount: 100,000
   - Duration: 5 days
   - pages: 15

Example Invoice Markdown Table

#### Project Invoice without category and pages

| Feature       | Description                                      | Amount     | Duration        |
|---------------|--------------------------------------------------|------------|-----------------|
| User Login    | Secure user login with email and password        | 100,000    | 5 days          |
| User Profile  | User profile management                          | 800,000    | 3 days          |
| Chat System   | Real-time chat functionality                     | 200,000    | 10 day          |
| UI Design     | Fine UI design                                   | 100,500    | 7 days          |
| Design Files  | All original design files in a zip file          | 500,000    | 0 days          |
| ...           | ...                                              | ...        | ...             |
|                                                                  | 1,700,500  | 25 days         |

**Total Cost**: 1,700,500

**Total Duration**: 25 days
`



export const NEW_DATA = `
[
    {
        "feature": "Responsive web",
        "amount": 2000000,
        "description": "We make the website responsive. (Layout changes depending on the size of the terminal such as PC / tablet / smartphone, etc.)",
        "category": "Platform and development language"
    },
    {
        "feature": "Cross platform",
        "amount": 4000000,
        "description": "Develop Android and iOS at once using Flutter. It is developed similar to a native app.",
        "category": "Platform and development language"
    },
    {
        "feature": "Hybrid app",
        "amount": 2500000,
        "description": "It is a combination of web and native apps.",
        "category": "Platform and development language"
    },
    {
        "feature": "Landing page",
        "amount": 2000000,
        "description": "Web/app service introduction page of 10 pages or less (if additional features are available, costs must be negotiated separately).",
        "category": "Platform and development language"
    },
    {
        "feature": "10 pages or less",
        "amount": 3000000,
        "description": "",
        "category": "Amount of UI pages to be implemented"
    },
    {
        "feature": "20 pages or less",
        "amount": 6000000,
        "description": "",
        "category": "Amount of UI pages to be implemented"
    },
    {
        "feature": "30 pages or less",
        "amount": 9000000,
        "description": "",
        "category": "Amount of UI pages to be implemented"
    },
    {
        "feature": "40 pages or less",
        "amount": 12000000,
        "description": "",
        "category": "Amount of UI pages to be implemented"
    },
    {
        "feature": "50 pages or less",
        "amount": 15000000,
        "description": "",
        "category": "Amount of UI pages to be implemented"
    },
    {
        "feature": "60 pages or less",
        "amount": 18000000,
        "description": "",
        "category": "Amount of UI pages to be implemented"
    },
    {
        "feature": "Sign up/Log in",
        "amount": 1500000,
        "description": "ID creation/login is possible, and ID/PW search is also included. (Can also be created in email format).",
        "category": "Sign up/Log in"
    },
    {
        "feature": "Mobile phone authentication",
        "amount": 500000,
        "description": "Use when mobile phone authentication is required on the sign-up page. (Authentication number sent).",
        "category": "Sign up/Log in"
    },
    {
        "feature": "SNS web login",
        "amount": 500000,
        "description": "Log in with your Kakao or Apple account. (There is a problem with statistical errors appearing as login methods become more diverse, so only Kakao and Apple logins are used).",
        "category": "Sign up/Log in"
    },
    {
        "feature": "SNS mobile login",
        "amount": 2000000,
        "description": "Log in with your Kakao or Apple account. (There is a problem with statistical errors appearing as login methods become more diverse, so only Kakao and Apple logins are used).",
        "category": "Sign up/Log in"
    },
    {
        "feature": "Non-login purchases",
        "amount": 1500000,
        "description": "When the service must be available without logging in.",
        "category": "Sign up/Log in"
    },
    {
        "feature": "Individual push notifications",
        "amount": 1500000,
        "description": "Device tokens for each user must be stored on the server, and the cost increases as the number of types of transmission increases.",
        "category": "Notification function related"
    },
    {
        "feature": "Domestic SMS notification",
        "amount": 1000000,
        "description": "Sending short/long text notifications, costs increase if they have to be sent in various situations.",
        "category": "Notification function related"
    },
    {
        "feature": "International SMS Notification",
        "amount": 1000000,
        "description": "Send short/long text notifications to overseas users.",
        "category": "Notification function related"
    },
    {
        "feature": "Email Notification",
        "amount": 1000000,
        "description": "Costs increase if there are many cases of sending notifications or if designs are required for the emails sent.",
        "category": "Notification function related"
    },
    {
        "feature": "KakaoTalk notification",
        "amount": 1000000,
        "description": "Approval and testing processes for message templates are required.",
        "category": "Notification function related"
    },
    {
        "feature": "050 virtual number",
        "amount": 1500000,
        "description": "Match virtual phone numbers to hide the recipient's phone number.",
        "category": "Notification function related"
    },
    {
        "feature": "Notification history",
        "amount": 1500000,
        "description": "When displaying notifications such as a friend invitation or a like for my post.",
        "category": "Notification function related"
    },
    {
        "feature": "Quotation calculation",
        "amount": 2000000,
        "description": "This is a function that allows users to select multiple items to calculate an estimate, and additional costs are incurred if items need to be edited in the manager.",
        "category": "O2O / Community related"
    },
    {
        "feature": "Step-by-step input",
        "amount": 1000000,
        "description": "When O2O services require sequential input across multiple pages, such as category, region, date, etc.",
        "category": "O2O / Community related"
    },
    {
        "feature": "Survey / Voting",
        "amount": 1500000,
        "description": "Ability to set questions and conduct short-answer/multiple-choice surveys or votes.",
        "category": "O2O / Community related"
    },
    {
        "feature": "Post feed",
        "amount": 1500000,
        "description": "Post screen similar to Instagram, Facebook, Kakao Story, Naver Band, etc.",
        "category": "O2O / Community related"
    },
    {
        "feature": "Questions/Answers",
        "amount": 1000000,
        "description": "Ability to ask and answer questions such as Intellectual and Stack Overflow.",
        "category": "O2O / Community related"
    },
    {
        "feature": "Bulletin Board / Permissions",
        "amount": 2000000,
        "description": "Implementation of community group entry, group bulletin board, and group permission consent functions.",
        "category": "O2O / Community related"
    },
    {
        "feature": "Gamification Badge",
        "amount": 2000000,
        "description": "Assign badges based on user activity (similar to the rating function).",
        "category": "O2O / Community related"
    },
    {
        "feature": "Permission to view content",
        "amount": 1500000,
        "description": "When a specific action such as payment/subscription is performed and viewing is restricted so that the content can be checked.",
        "category": "O2O / Community related"
    },
    {
        "feature": "Recruitment/Employment",
        "amount": 2000000,
        "description": "When requesting a part-time job or professional job search or requesting work, etc.",
        "category": "O2O / Community related"
    },
        {
        "feature": "Invite",
        "amount": 1000000,
        "description": "Method of generating invitation codes for each user, such as a referral code.",
        "category": "O2O / Community related"
    },
    {
        "feature": "CK Editor",
        "amount": 500000,
        "description": "An editor that allows you to apply styles such as font thickness and color when entering text.",
        "category": "Edit/Upload related"
    },
    {
        "feature": "Attach a single image/file",
        "amount": 500000,
        "description": "Ability to upload images/files in one step",
        "category": "Edit/Upload related"
    },
    {
        "feature": "Attach multiple images/files",
        "amount": 1000000,
        "description": "A method of uploading multiple images and files at once",
        "category": "Edit/Upload related"
    },
    {
        "feature": "Embed YouTube/Vimeo video",
        "amount": 500000,
        "description": "This is a method of inserting into the screen using an existing video service, which generates less traffic than inserting the original video.",
        "category": "Edit/Upload related"
    },
    {
        "feature": "Audio/video upload and playback",
        "amount": 2000000,
        "description": "This method inserts original audio/video, requires additional development such as server settings and storage settings, and incurs high traffic costs.",
        "category": "Edit/Upload related"
    },
    {
        "feature": "Upload large files (300MB or more)",
        "amount": 1000000,
        "description": "Additional costs are incurred as large files require separate processing.",
        "category": "Edit/Upload related"
    },
    {
        "feature": "User Mentions (@)",
        "amount": 1500000,
        "description": "Ability to mention friends or following users in the input window (including auto-completion).",
        "category": "Edit/Upload related"
    },
    {
        "feature": "Tag auto-completion",
        "amount": 1000000,
        "description": "Auto-complete functions for hashtags, etc., and functions such as displaying them in the order they are frequently entered.",
        "category": "Edit/Upload related"
    },
    {
        "feature": "Simple graph",
        "amount": 1000000,
        "description": "Displays bar, line, spray, and circular graphs.",
        "category": "Edit/Upload related"
    },
    {
        "feature": "Complex graph",
        "amount": 3000000,
        "description": "More than n graphs displayed.",
        "category": "Edit/Upload related"
    },
    {
        "feature": "QR code/barcode creation",
        "amount": 1500000,
        "description": "Generate QR codes or barcodes.",
        "category": "Edit/Upload related"
    },
    {
        "feature": "Product information tag in image",
        "amount": 3500000,
        "description": "Tag information such as name, price, and link at a specific location in the photo. (ex. When you move the cursor over the photo, the product description appears).",
        "category": "Edit/Upload related"
    },
    {
        "feature": "Calendar UI features",
        "amount": 3000000,
        "description": "This is a function such as registering an event on a calendar, and the cost may vary depending on complexity.",
        "category": "Advanced features"
    },
    {
        "feature": "Pop-up display on map",
        "amount": 1000000,
        "description": "Displays a summary information pop-up rather than a pin on the map. Ex) Store name, address, phone number.",
        "category": "Advanced features"
    },
    {
        "feature": "Linking maps and lists",
        "amount": 3000000,
        "description": "Link pins on the map with the search results list. Ex) When searching for ‘Itda’, all results that appear are displayed on the map.",
        "category": "Advanced features"
    },
    {
        "feature": "Know your current location",
        "amount": 1000000,
        "description": "When running the app, it determines your current location. (GPS).",
        "category": "Advanced features"
    },
    {
        "feature": "Save drag/drop location",
        "amount": 2000000,
        "description": "You can place images, tables, etc. by dragging and dropping and save their locations.",
        "category": "Advanced features"
    },
    {
        "feature": "Complex calculation formulas",
        "amount": 3500000,
        "description": "When deriving results through complex calculations is necessary.",
        "category": "Advanced features"
    },
    {
        "feature": "Contact us",
        "amount": 500000,
        "description": "This is an inquiry function that allows users to leave questions and be confirmed by administrators.",
        "category": "Social features related"
    },
    {
        "feature": "1:1 simple chat",
        "amount": 4000000,
        "description": "It is a 1:1 chat where simple text is exchanged between users.",
        "category": "Social features related"
    },
    {
        "feature": "Complex chat",
        "amount": 10000000,
        "description": "Chatting such as multi-person chatting, images within the chat, and file transfer are possible, and costs may vary depending on the function.",
        "category": "Social features related"
    },
    {
        "feature": "Following",
        "amount": 1000000,
        "description": "You can follow members by visiting their profiles and check follow/following information.",
        "category": "Social features related"
    },
    {
        "feature": "Web sharing function",
        "amount": 500000,
        "description": "Share your screen on Facebook, Twitter, etc. within the web.",
        "category": "Social features related"
    },
    {
        "feature": "App sharing function",
        "amount": 1500000,
        "description": "Share your screen on Facebook, KakaoTalk, etc. within the app. It is a more complex process than the web and adds more costs.",
        "category": "Social features related"
    },
    {
        "feature": "Permission and level management",
        "amount": 1500000,
        "description": "When you need to separate menu access/editing rights by user or administrator.",
        "category": "Social features related"
    },
    {
        "feature": "Deep Link (Dynamic Link)",
        "amount": 2000000,
        "description": "Click on the shared link to go to a specific page of the app or to the installation page if the app is not installed.",
        "category": "Social features related"
    },
    {
        "feature": "Bluetooth integration",
        "amount": 5000000,
        "description": "This function connects a Bluetooth device and smartphone Bluetooth.",
        "category": "Native features related"
    },
    {
        "feature": "Address book linkage",
        "amount": 5000000,
        "description": "Import and utilize smartphone address book information.",
        "category": "Native features related"
    },
    {
        "feature": "QR/barcode recognition",
        "amount": 3000000,
        "description": "You can use the QR/barcode recognition module to recognize codes and move pages.",
        "category": "Native features related"
    },
    {
        "feature": "Track rewarded ad installs",
        "amount": 5000000,
        "description": "To provide rewards for rewarded advertising, a native implementation is required to track app installations, ad views, etc.",
        "category": "Native features related"
    },
    {
        "feature": "Display external web within app",
        "amount": 3000000,
        "description": "Display external web pages within the app rather than sending them to the default browser.",
        "category": "Native features related"
    },
    {
        "feature": "Native camera shooting",
        "amount": 5000000,
        "description": "Customizing the camera shooting screen must be written in native code.",
        "category": "Native features related"
    },
    {
        "feature": "Native image editing",
        "amount": 8000000,
        "description": "This function allows you to select or edit multiple photos in order.",
        "category": "Native features related"
    },
    {
        "feature": "Other SDK integration",
        "amount": 8000000,
        "description": "Compared to server API calls, native SDK integration takes a lot of work.",
        "category": "Native features related"
    },
    {
        "feature": "Flutter multilingual translation function",
        "amount": 1000000,
        "description": "We provide translation support for multiple languages. The higher the number supported, the higher the price.",
        "category": "Native features related"
    },
    {
        "feature": "Native video player",
        "amount": 5000000,
        "description": "If you customize the player screen, you must implement the player natively.",
        "category": "Native features related"
    },
    {
        "feature": "Payment and payment cancellation",
        "amount": 5000000,
        "description": "Through domestic PG companies, card payment linkage / virtual account payment / overseas payment, etc. are possible. / Including cancellation",
        "category": "Payment-related features"
    },
    {
        "feature": "Accumulated points/point system",
        "amount": 1000000,
        "description": "Costs may increase if there is an expiration date for accrued benefits or if all accrued points deductions must be logged.",
        "category": "Payment-related features"
    },
    {
        "feature": "Coupon",
        "amount": 2000000,
        "description": "We apply various coupon policies, including shipping coupons, dollar coupons, and percentage coupons.",
        "category": "Payment-related features"
    },
    {
        "feature": "Automatic payment upon regular/purchase",
        "amount": 3000000,
        "description": "Enter your card number and pay automatically every month or at the time of purchase.",
        "category": "Payment-related features"
    },
    {
        "feature": "Shopping cart",
        "amount": 3000000,
        "description": "If you add it to your shopping cart, shipping/coupon procedures, etc. may become complicated.",
        "category": "Payment-related features"
    },
    {
        "feature": "Establish payment without payment linkage service",
        "amount": 15000000,
        "description": "If a customer contracts directly with a payment company, costs increase because a separate payment module must be built.",
        "category": "Payment-related features"
    },
    {
        "feature": "Simple API",
        "amount": 1500000,
        "description": "When the number of requests is small and the data exchanged when making a call is simple.",
        "category": "External API and crawling related"
    },
    {
        "feature": "Complex API",
        "amount": 3500000,
        "description": "When there is an authentication process and the data being sent and received is complex.",
        "category": "External API and crawling related"
    },
    {
        "feature": "Periodic data processing/notification",
        "amount": 1500000,
        "description": "When periodic API processing or message sending is required.",
        "category": "External API and crawling related"
    },
    {
        "feature": "Background processing",
        "amount": 1500000,
        "description": "Time-consuming tasks such as large uploads and statistical processing are processed in the background. (Some functions work even if you close the app.)",
        "category": "External API and crawling related"
    },
    {
        "feature": "Page 1",
        "amount": 300000,
        "description": "A method of collecting web documents made public outside the organization, such as SNS, news, and web information.",
        "category": "Server crawl"
    },
    {
        "feature": "Less than 5 pages",
        "amount": 1500000,
        "description": "A method of collecting web documents made public outside the organization, such as SNS, news, and web information.",
        "category": "Server crawl"
    },
    {
        "feature": "Less than 10 pages",
        "amount": 3000000,
        "description": "A method of collecting web documents made public outside the organization, such as SNS, news, and web information.",
        "category": "Server crawl"
    },
    {
        "feature": "Less than 20 pages",
        "amount": 6000000,
        "description": "A method of collecting web documents made public outside the organization, such as SNS, news, and web information.",
        "category": "Server crawl"
    },
    {
        "feature": "Item list/detail page",
        "amount": 1000000,
        "description": "Item list and detail pages are more complex than general pages.",
        "category": "Item list / details"
    },
    {
        "feature": "Great",
        "amount": 500000,
        "description": "Ability to like an item and check it on My Page.",
        "category": "Item list / details"
    },
    {
        "feature": "Bookmark (Scrap)",
        "amount": 500000,
        "description": "Ability to bookmark items and check them on My Page.",
        "category": "Item list / details"
    },
    {
        "feature": "Manage favorite/bookmark folders",
        "amount": 1000000,
        "description": "Ability to manage favorites or bookmarks by folder.",
        "category": "Item list / details"
    },
    {
        "feature": "Reviews / Ratings",
        "amount": 500000,
        "description": "When an item has the ability to leave a star review.",
        "category": "Item list / details"
    },
    {
        "feature": "Product options",
        "amount": 1000000,
        "description": "There are multiple options for each item, so selection is required at checkout.",
        "category": "Item list / details"
    },
    {
        "feature": "Search",
        "amount": 500000,
        "description": "Search item name/description.",
        "category": "Item list / details"
    },
    {
        "feature": "Integrated search",
        "amount": 1500000,
        "description": "Integrated search for item name, category, member, etc.",
        "category": "Item list / details"
    },
    {
        "feature": "Recent searches",
        "amount": 500000,
        "description": "Stores and displays users' recently searched terms.",
        "category": "Item list / details"
    },
    {
        "feature": "Popular searches",
        "amount": 500000,
        "description": "Save and display search terms frequently searched by users.",
        "category": "Item list / details"
    },
    {
        "feature": "Make a reservation",
        "amount": 1000000,
        "description": "Ability to reserve a location by date or time (reservation management required).",
        "category": "Item list / details"
    },
    {
        "feature": "Report",
        "amount": 500000,
        "description": "Ability to report posts or users (required for Apple App Store release).",
        "category": "Item list / details"
    },
    {
        "feature": "Ranking",
        "amount": 1500000,
        "description": "A function to display the number of views, likes, etc. by total ranking, monthly, and daily.",
        "category": "Item list / details"
    },
    {
        "feature": "Recommended / Similar Items",
        "amount": 1000000,
        "description": "Additional costs may apply if the logic for displaying items associated with a specific item is complex.",
        "category": "Item list / details"
    },
    {
        "feature": "Detailed condition filtering",
        "amount": 1500000,
        "description": "Ability to filter based on item price, category, and other additional information.",
        "category": "Item list / details"
    },
    {
        "feature": "Filter/sort by distance",
        "amount": 500000,
        "description": "Ability to sort/filter in order of proximity based on address/coordinates.",
        "category": "Item list / details"
    },
    {
        "feature": "Comment",
        "amount": 300000,
        "description": "When there is a function to comment on posts or items.",
        "category": "Item list / details"
    },
    {
        "feature": "Reply",
        "amount": 500000,
        "description": "When there is a function to add additional comments to comments.",
        "category": "Item list / details"
    },
    {
        "feature": "PDF automatic output",
        "amount": 1500000,
        "description": "When creating a PDF with formats such as titles, paragraphs, tables, etc.",
        "category": "Document extraction related"
    },
    {
        "feature": "Simple Excel import/export",
        "amount": 1500000,
        "description": "Function to register or download data in Excel, less than 3 types of Excel",
        "category": "Document extraction related"
    },
    {
        "feature": "Complex Excel import/export",
        "amount": 3000000,
        "description": "Function to register or download data in Excel, more than 4 types of Excel",
        "category": "Document extraction related"
    },
    {
        "feature": "Menu name multilingual processing",
        "amount": 2500000,
        "description": "The database does not consider multilingualism and only handles menu names and site text in multiple languages.",
        "category": "Internationalization related"
    },
    {
        "feature": "Post data multilingual processing",
        "amount": 5000000,
        "description": "Manage not only menu names/phrases but also notices and bulletin boards separately by language.",
        "category": "Internationalization related"
    },
    {
        "feature": "Time zone application for each user’s country",
        "amount": 2500000,
        "description": "When targeting users from various countries and requiring time zone settings for each user",
        "category": "Internationalization related"
    },
    {
        "feature": "Working with code comments",
        "amount": 1500000,
        "description": "If necessary, we will clean up the annotated code annotation work.",
        "category": "etc"
    },
    {
        "feature": "Migrate existing data",
        "amount": 1500000,
        "description": "When you need to migrate a database from an existing service to a new platform",
        "category": "etc"
    },
    {
        "feature": "Write test code",
        "amount": 5000000,
        "description": "If you need to write code for the logic. Provided over 95%",
        "category": "etc"
    },
    {
        "feature": "View/edit/delete key data",
        "amount": 1000000,
        "description": "View/edit/delete/search/sort functions for key data",
        "category": "Implementation of administrator/vendor functions"
    },
    {
        "feature": "Inventory management",
        "amount": 1500000,
        "description": "Product inventory and sales quantity management",
        "category": "Implementation of administrator/vendor functions"
    },
    {
        "feature": "Product management",
        "amount": 1000000,
        "description": "Ability for businesses/sellers to register and manage product information",
        "category": "Implementation of administrator/vendor functions"
    },
    {
        "feature": "Order Management",
        "amount": 1000000,
        "description": "Ability for companies/sellers to manage order details",
        "category": "Implementation of administrator/vendor functions"
    },
    {
        "feature": "Delivery Management",
        "amount": 1000000,
        "description": "Delivery status management and invoice number input management",
        "category": "Implementation of administrator/vendor functions"
    },
    {
        "feature": "Settlement Management",
        "amount": 1000000,
        "description": "Manage weekly/monthly settlement amounts to settle payments from sellers/companies (transfers must be made directly)",
        "category": "Implementation of administrator/vendor functions"
    },
    {
        "feature": "Ad Management",
        "amount": 2000000,
        "description": "Manage ad posts and placements, deduct ad credit per ad click",
        "category": "Implementation of administrator/vendor functions"
    },
    {
        "feature": "Reservation Management",
        "amount": 1000000,
        "description": "Management function to set reservationable times",
        "category": "Implementation of administrator/vendor functions"
    },
    {
        "feature": "Holiday management",
        "amount": 1500000,
        "description": "Ability to register basic holidays and manage additional holidays",
        "category": "Implementation of administrator/vendor functions"
    },
    {
        "feature": "Meeting Management",
        "amount": 1000000,
        "description": "Ability to create and manage meetings",
        "category": "Implementation of administrator/vendor functions"
    },
    {
        "feature": "Daily statistics",
        "amount": 1000000,
        "description": "Sums up several pieces of data on a daily basis and displays the number and amount",
        "category": "Implementation of administrator/vendor functions"
    },
    {
        "feature": "Weekly statistics",
        "amount": 1000000,
        "description": "Statistics aggregated by week",
        "category": "Implementation of administrator/vendor functions"
    },
    {
        "feature": "Monthly statistics",
        "amount": 1000000,
        "description": "Statistics aggregated by month",
        "category": "Implementation of administrator/vendor functions"
    },
    {
        "feature": "Statistics for multiple items",
        "amount": 3000000,
        "description": "Select multiple items to display statistics for those items",
        "category": "Implementation of administrator/vendor functions"
    },
    {
        "feature": "Period statistics on inquiry date",
        "amount": 2000000,
        "description": "Select a date to display statistics for that period",
        "category": "Implementation of administrator/vendor functions"
    },
    {
        "feature": "Attendance management",
        "amount": 1000000,
        "description": "Function to manage employees’ attendance / departure / tardiness / absence / annual leave, etc.",
        "category": "Implementation of administrator/vendor functions"
    },
    {
        "feature": "Basic management screen",
        "amount": 5000000,
        "description": "Basic administrator screen for operating web/app services such as notices, banners, member and employee management, etc.",
        "category": "Implementation of administrator/vendor functions"
    },
    {
        "feature": "Time staff",
        "amount": 3000000,
        "description": "Stores event statistics that occur when members touch/click the screen (separate negotiation of fees for exceeding 20 pages)",
        "category": "Implementation of administrator/vendor functions"
    },
    {
        "feature": "Real name/communication company authentication",
        "amount": 1000000,
        "description": "Your date of birth and mobile phone number are verified together to verify that you are the actual person. It is cumbersome from the user's perspective and becomes a barrier to entry.",
        "category": "Sign up/Log in"
    },
    {
        "feature": "Keyword Notification",
        "amount": 5000000,
        "description": "When you set a specific keyword, content containing that keyword is sent as a push notification.",
        "category": "Notification function related"
    },
    {
        "feature": "In-app payment",
        "amount": 3000000,
        "description": "This is a method of payment directly within the Play Store or App Store, and the fee is relatively high.",
        "category": "Payment-related features"
    },
    {
        "feature": "More than 20 pages",
        "amount": 0,
        "description": "If it exceeds 20 pages, separate cost consultation is required.",
        "category": "Server crawl"
    },
    {
        "feature": "Has storyboard",
        "amount": 0,
        "description": "Except when rework is required.",
        "category": ""
    },
    {
        "feature": "With logo",
        "amount": 0,
        "description": "Except when rework is required.",
        "category": ""
    },
    {
        "feature": "Has screen design",
        "amount": 0,
        "description": "Except when rework is required.",
        "category": ""
    },
    {
        "feature": "Report Management",
        "amount": 1000000,
        "description": "Reported post/reason inquiry and processing function.",
        "category": "Implementation of administrator/vendor functions"
    },
    {
        "feature": "Comment Management",
        "amount": 1000000,
        "description": "Features that can be activated/deactivated after checking the comment content.",
        "category": "Implementation of administrator/vendor functions"
    },
    {
        "feature": "DB full backup (daily basis)",
        "amount": 1000000,
        "description": "Back up the entire database on a daily basis.",
        "category": "etc"
    },
    {
        "feature": "Server full backup (daily basis)",
        "amount": 1000000,
        "description": "We back up all code on the server on a daily basis.",
        "category": "etc"
    }
]
`;

export const SYSTEM_INSTRUCTION = `

${PERSONA_INSTRUCTION}
      
<INSTRUCTIONS>
To complete the task, you need to follow these steps:
1. The user will provide what project he wants to build
2. Provide a list of features that the user must include in the project.
3. Ask the user if theres more feature he wants to include in the project. and list related features.
4. Provide the total cost of the project.
5. ALWAYS include the invoice and must be in a table format at the end.
</INSTRUCTIONS>

<DATA>
${NEW_DATA}
</DATA>      
`;


export const OLD_DATA = `
[
    { 
        "feature": "Password recovery",
        "amount": 350000,
        "description": "Password recovery system with email verification. Suggest this to the user if the target audience of the users of the project are older than 60. And let the admin to reset the password for the user.",
        "duration": "2 days",
        "category": "login",
        "pages": 2
    },
    { 
        "feature": "User management",
        "amount": 800000,
        "description": "User management system with login, registration and password recovery",
        "duration": "5 days",
        "category": "admin",
        "pages": 30
    },
    { 
        "feature": "Google login",
        "amount": 100000,
        "description": "Allow users to login with their Google account",
        "duration": "1 days",
        "category": "login",
        "pages": 1
    },
    { 
        "feature": "Facebook login",
        "amount": 120000,
        "description": "Allow users to login with their Facebook account",
        "duration": "1 days",
        "category": "login",
        "pages": 1
    },
    { 
        "feature": "Apple login",
        "amount": 130000,
        "description": "Allow users to login with their Apple account",
        "duration": "1 days",
        "category": "login",
        "pages": 1
    },
    { 
        "feature": "Kakaotalk login",
        "amount": 140000,
        "description": "Allow users to login with their Kakaotalk account",
        "duration": "1 days",
        "category": "login",
        "pages": 1
    },
    { 
        "feature": "Naver login",
        "amount": 110000,
        "description": "Allow users to login with Naver account",
        "duration": "1 days",
        "category": "login",
        "pages": 1
    },
    { 
        "feature": "Chat",
        "amount": 250000,
        "description": "Allow users to chat with each other",
        "duration": "15 days",
        "category": "chat",
        "pages": 15
    },
    { 
        "feature": "Push notification",
        "amount": 500000,  
        "description": "Send notifications to users",
        "duration": "5 days",
        "category": "notification",
        "pages": 5
    },
    { 
        "feature": "Image upload",
        "amount": 150000,
        "description": "Allow users to upload images",
        "duration": "2 days",
        "category": "media",
        "pages": 2
    },
    { 
        "feature": "Image gallery",
        "amount": 200000,
        "description": "Allow users to view images",
        "duration": "3 days",
        "category": "media",
        "pages": 8
    },
    { 
        "feature": "Image editing",
        "amount": 300000,
        "description": "Allow users to edit images",
        "duration": "5 days",
        "category": "media",
        "pages": 23
    },
    { 
        "feature": "Video upload",
        "amount": 150000,
        "description": "Allow users to upload videos",
        "duration": "2 days",
        "category": "media",
        "pages": 25
    },
    { 
        "feature": "Video gallery",
        "amount": 200000,
        "description": "Allow users to view videos",
        "duration": "3 days",
        "category": "media",
        "pages": 34
    },
    { 
        "feature": "Audio upload",
        "amount": 150000,
        "description": "Allow users to upload audio",
        "duration": "2 days",
        "category": "media",
        "pages": 22
    },
    { 
        "feature": "Audio gallery",
        "amount": 200000,
        "description": "Allow users to view audio",
        "duration": "3 days",
        "category": "media",
        "pages": 13
    },
    { 
        "feature": "File upload",
        "amount": 150000,
        "description": "Allow users to upload files",
        "duration": "2 days",
        "category": "media",
        "pages": 12
    },
    { 
        "feature": "File gallery",
        "amount": 200000,
        "description": "Allow users to view files",
        "duration": "3 days",
        "category": "media",
        "pages": 14
    },
    { 
        "feature": "Follow system",
        "amount": 180000,
        "description": "Allow users to follow each other",
        "duration": "2 days",
        "category": "forum",
        "pages": 20
    },
    { 
        "feature": "Like system",
        "amount": 280000,
        "description": "Allow users to like each other's posts",
        "duration": "8 days",
        "category": "forum",
        "pages": 8
    },
    { 
        "feature": "Comment system",
        "amount": 350000,
        "description": "Allow users to comment on each other's posts",
        "duration": "5 days",
        "category": "forum",
        "pages": 2
    },
    { 
        "feature": "Post system",
        "amount": 250000,
        "description": "Allow users to post each other's posts",
        "duration": "6 days",
        "category": "forum",
        "pages": 20
    },
    { 
        "feature": "User Search",
        "amount": 250000,
        "description": "Allow users to search each other's posts",
        "duration": "5 days",
        "category": "widget",
        "pages": 17
    },
    { 
        "feature": "Filter system",
        "amount": 250000,
        "description": "Allow users to filter each other's posts",
        "duration": "5 days",
        "category": "admin",
        "pages": 5
    },
    { 
        "feature": "Feed system",
        "amount": 250000,
        "description": "Allow users to view each other's user feeds",
        "duration": "5 days",
        "category": "forum",
        "pages": 12
    },
    { 
        "feature": "Profile system",
        "amount": 250000,
        "description": "Allow users to view each other's public profiles",
        "duration": "5 days",
        "category": "forum",
        "pages": 3
    },
    { 
        "feature": "Settings system",
        "amount": 250000,
        "description": "Allow users to view each other's settings",
        "duration": "5 days",
        "category": "admin",
        "pages": 10
    },
    { 
        "feature": "Sharing profile",
        "amount": 250000,
        "description": "Allow users to share each other's profiles",
        "duration": "5 days",
        "category": "forum",
        "pages": 8
    },
    { 
        "feature": "Sharing post",
        "amount": 250000,
        "description": "Allow users to share each other's posts",
        "duration": "5 days",
        "category": "forum",
        "pages": 12
    },
    { 
        "feature": "Sharing image",
        "amount": 250000,
        "description": "Allow users to share each other's images",
        "duration": "5 days",
        "category": "forum",
        "pages": 8
    },
    { 
        "feature": "Sharing video",
        "amount": 250000,
        "description": "Allow users to share each other's videos",
        "duration": "5 days",
        "category": "forum",
        "pages": 10
    },
    { 
        "feature": "Sharing audio",
        "amount": 250000,
        "description": "Allow users to share each other's audio",
        "duration": "5 days",
        "category": "forum",
        "pages": 6
    },
    { 
        "feature": "To-do list app",
        "amount": 100000,
        "description": "A simple task manager with CRUD operations",
        "duration": "3 days",
        "category": "lifestyle",
        "pages": 10
    },
    { 
        "feature": "Weather app",
        "amount": 150000,
        "description": "Fetch and display weather data using an API",
        "duration": "4 days",
        "category": "widget",
        "pages": 2
    },
    { 
        "feature": "Calculator app",
        "amount": 80000,
        "description": "A basic arithmetic calculator with a clean UI",
        "duration": "2 days",
        "category": "widget",
        "pages": 1
    },
    { 
        "feature": "Blog website",
        "amount": 200000,
        "description": "A simple blog with post creation and comments",
        "duration": "5 days",
        "category": "forum",
        "pages": 30
    },
    { 
        "feature": "Recipe app",
        "amount": 180000,
        "description": "A collection of recipes with search and filter functionality",
        "duration": "4 days",
        "category": "lifestyle",
        "pages": 15
    },
    { 
        "feature": "Expense tracker",
        "amount": 250000,
        "description": "Track daily expenses with a summary dashboard",
        "duration": "6 days",
        "category": "lifestyle",
        "pages": 8
    },
    { 
        "feature": "QR code generator",
        "amount": 120000,
        "description": "Generate QR codes for links or text input",
        "duration": "3 days",
        "category": "widget",
        "pages": 4
    },
    { 
        "feature": "Portfolio website",
        "amount": 220000,
        "description": "A personal portfolio with projects and contact info",
        "duration": "5 days",
        "category": "web",
        "pages": 10
    },
    { 
        "feature": "E-commerce website",
        "amount": 500000,
        "description": "A basic store with product listings, cart, and checkout",
        "duration": "10 days",
        "category": "ecommerce",
        "pages": 30
    },
    { 
        "feature": "Group Chat",
        "amount": 400000,
        "description": "Group chat",
        "duration": "8 days",
        "category": "chat",
        "pages": 20
    },
    { 
        "feature": "News aggregator",
        "amount": 300000,
        "description": "Pull news from APIs and display by category",
        "duration": "7 days",
        "category": "news",
        "pages": 10
    },
    { 
        "feature": "Habit tracker",
        "amount": 280000,
        "description": "Track daily habits and show progress visually",
        "duration": "6 days",
        "category": "lifestyle",
        "pages": 15
    },
    { 
        "feature": "Movie database app",
        "amount": 350000,
        "description": "Fetch movie data from an API and allow user ratings",
        "duration": "7 days",
        "category": "entertainment",
        "pages": 20
    },
    { 
        "feature": "Event booking app",
        "amount": 450000,
        "description": "Book and manage events with seat selection",
        "duration": "10 days",
        "category": "booking",
        "pages": 20
    },
    { 
        "feature": "Hotel booking app",
        "amount": 450000,
        "description": "Book and manage hotel rooms with date selection",
        "duration": "15 days",
        "category": "booking",
        "pages": 15
    },
    { 
        "feature": "Restaurant booking app",
        "amount": 450000,
        "description": "Restaurant reservation with date selection",
        "duration": "9 days",
        "category": "booking",
        "pages": 10
    },
    { 
        "feature": "Fitness tracker",
        "amount": 400000,
        "description": "Log workouts, set goals, and visualize progress",
        "duration": "8 days",
        "category": "lifestyle",
        "pages": 14
    },
    { 
        "feature": "Online quiz app",
        "amount": 300000,
        "description": "A trivia quiz with a timer and scoring system",
        "duration": "6 days",
        "category": "games",
        "pages": 20
    },
    { 
        "feature": "AI powered chatbot",
        "amount": 700000,
        "description": "A chatbot that uses NLP for customer service",
        "duration": "12 days",
        "category": "chat",
        "pages": 15
    },
    { 
        "feature": "Stock market tracker",
        "amount": 600000,
        "description": "Display real-time stock data with historical charts",
        "duration": "10 days",
        "category": "admin",
        "pages": 30
    },
    { 
        "feature": "Social media platform",
        "amount": 1200000,
        "description": "Users can post, like, comment, and follow others",
        "duration": "20 days",
        "category": "forum",
        "pages": 10
    },
    { 
        "feature": "Task management app",
        "amount": 900000,
        "description": "Drag-and-drop task management with team collaboration",
        "duration": "15 days",
        "category": "admin",
        "pages": 17
    },
    { 
        "feature": "Video/audio Streaming service",
        "amount": 1500000,
        "description": "A video/audio streaming platform with user subscriptions",
        "duration": "25 days",
        "category": "streaming",
        "pages": 10
    },
    { 
        "feature": "Real estate app",
        "amount": 1000000,
        "description": "List, filter, and book real estate properties",
        "duration": "18 days",
        "category": "ecommerce",
        "pages": 35
    },
    { 
        "feature": "AI powered resume builder",
        "amount": 800000,
        "description": "Generate resumes based on user input and AI suggestions",
        "duration": "14 days",
        "category": "ai",
        "pages": 6
    },
    { 
        "feature": "Virtual classroom",
        "amount": 1300000,
        "description": "Online learning platform with video calls and quizzes",
        "duration": "22 days",
        "category": "chat",
        "pages": 10
    },
    { 
        "feature": "Video call",
        "amount": 1300000,
        "description": "Video and audio call functionality",
        "duration": "22 days",
        "category": "chat",
        "pages": 10
    },
    { 
        "feature": "Simple website",
        "amount": 100000,
        "description": "A simple website with basic features",
        "duration": "3 days",
        "category": "web",
        "pages": 10
    },
    { 
        "feature": "Simple UI design",
        "amount": 100000,
        "description": "A simple UI design with basic features",
        "duration": "3 days",
        "category": "design",
        "pages": 0
    },
    { 
        "feature": "Fine UI design",
        "amount": 200000,
        "description": "A fine UI design with basic features",
        "duration": "5 days",
        "category": "design",
        "pages": 0
    },
    { 
        "feature": "Design file",
        "amount": 500000,
        "description": "All original design files will be provided in a zip file",
        "duration": "0 days",
        "category": "design",
        "pages": 0
    }
]`;