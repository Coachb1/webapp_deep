# BookPageClient(Library-Bot) Documentation

## Overview
`BookPageClient` is the primary client-side controller for the Course/Library feature. It acts as a container that manages the state of the library, fetches course data, and orchestrates the rendering of various sub-modules (Case Studies, AI Landscape, Transformation Tools) via the `ActionDashboard`.

## Component Architecture

### Hierarchy
- **Parent:** `BookPageClient` (Next.js Client Component)
- **Context:** `UserContext` (Provides `user`, `userInfo`, `loading`)
- **Key Subcomponents:**
  - **Navigation/Layout:** `Header`, `Hero`
  - **Control:** `ActionDashboard` (Tab switcher)
  - **Content Views:**
    - `ConceptsViewer` (Conceptual slides)
    - `CompanyIQ` (AI Landscape/Market Intelligence)
    - `BookSection` (The main library grid of books/cases)
    - `IdeaBoardReport` (Alignment reporting tool)
    - `ConversationalForm` (Proposal submission tool)
  - **Overlays:** `AudioPlayer`, `BookDescription` (Modal), `CoachBotsWidget` (AI Assistant)

---

## Data Integration & API Mapping

### Primary Data Fetch
**Function:** `fetchBooks(id, uid)`
**Source:** `@/lib/api`
**Trigger:** `useEffect` on mount or `id` change.

### Backend to Frontend Mapping
The API returns a `CoursePackage` object. Here is how fields map to the component state:

| Backend Field (`CoursePackage`) | Frontend State | Usage |
| :--- | :--- | :--- |
| `package_name` | `title` | Displayed in Hero section. |
| `package_description` | `subTitle` | Displayed in Hero section. |
| `books` | `allBooks` | The master list of all books/cases. |
| `books` | `filteredBooks` | The currently displayed list after search/filter. |
| `books[0].course_id` | `courseId` | Used by `AudioPlayer` for tracking. |
| `jobaid_id` | `jobAidId` | Passed to `IdeaBoardReport` and `ConversationalForm`. |
| `image_link` | `heroImageLink` | Background image for the Hero. |
| `prompt_job_aid_uid` | `packageDetails.prompt_job_aid_uid` | Config for AI prompts in subcomponents. |
| `report_config` | `packageDetails.report_config` | Config for generating reports. |

---

## Key Features & Logic

### 1. Action Dashboard (View Switching)
The component uses `actionKey` state to determine which main section to render.

| Action Key | Component Rendered | Description |
| :--- | :--- | :--- |
| `CONCEPTS...` | `<ConceptsViewer />` | Displays educational concepts. |
| `AI_LANDSCAPE` | `<CompanyIQ />` | Shows market intelligence/company data. |
| `SHOW_AI_CASES` | `<BookSection />` | Displays the searchable grid of books/cases. |
| `INTERNAL_TRANSFORMATION_ALIGN` | `<IdeaBoardReport />` | Renders the alignment report tool. |
| `INTERNAL_TRANSFORMATION_PROPOSE` | `<ConversationalForm />` | Renders the proposal input form. |

### 2. Search & Filtering Engine
Filtering logic is handled client-side to ensure responsiveness.

- **Global Search (`handleSearch`)**:
  - Matches against: `title`, `author`, `list_name`, `tag`, `keywords`.
  - Supports comma-separated queries (OR logic between terms).

- **Advanced Multi-Filter (`handleMultipleSearch`)**:
  - Applies **AND** logic across specific fields:
    - `tag`
    - `business_outcome`
    - `implementation_complexity`
    - `unexpected_outcomes`
    - `emerging_players`
    - `function`
    - `start_up`

- **Quick Filter (`handleFilterChange`)**:
  - Simple filter for `list_name` or `tag`.

### 3. Audio Player Integration
- **State:** `showAudioPlayer`, `currentBook`, `currentBookIndex`.
- **Behavior:**
  - The player is global to the page (fixed position).
  - `handlePlayBook`: Sets the current book and opens the player.
  - `handleNextBook` / `handlePrevBook`: Cycles through `filteredBooks`.
  - **Tracking:** If `onlyClientSetup` is false, completion is tracked via API.

### 4. Feature Flags & Configuration
- **Transform IQ:** Controlled by `userInfo.libraryBotConfig.feature_and_button_controls.transform_iq_feature`.
- **CoachBot:** Controlled by `userInfo.libraryBotConfig.bot_config.coaching`.

---

## Developer Notes

### Props Interface
```typescript
interface BookPageClientProps {
  id: string;              // The Package/Course ID to fetch
  onlyClientSetup?: boolean; // Flag to disable certain write-backs (e.g., audio tracking)
}
```

### Important Implementation Details
1.  **Scroll Behavior:** When an action is selected in `ActionDashboard`, the page smooth-scrolls to `#action-section`.
2.  **Loading State:** A full-screen overlay with a spinner blocks interaction while `fetchBooks` is pending (`LibraryLoading`).
3.  **Local Storage:** The `jobaid_id` is cached in `localStorage` under the key `'jobaid'`.

### Subcomponent Props Reference

#### `<BookSection />`
- **Role:** The main UI for browsing cases.
- **Key Props:**
  - `books`: The filtered list of books to display.
  - `onSearch`, `onMultipleSearch`: Callbacks to trigger filtering in the parent.
  - `onPlayBook`: Callback to open the AudioPlayer.
  - `packageDetails`: Configuration object derived from the API response.

#### `<ConversationalForm />`
- **Role:** Form for submitting transformation proposals.
- **Key Props:**
  - `job_aid_id`: Links the form to the specific job aid.
  - `isEmailSection`: Mapped from `onlyClientSetup`.

#### `<IdeaBoardReport />`
- **Role:** Reporting dashboard.
- **Key Props:**
  - `jobaid`: The ID required to fetch report data.
  - `onlyclientsetup`: Config flag.

#### `<CoachBotsWidget />`
- **Role:** Floating AI assistant.
- **Key Props:**
  - `botId`: Dynamically sourced from `userInfo` config.
  - `clientId`: Sourced from `userInfo.clientName`.

---
*Documentation generated for `webapp_deep` repository.*