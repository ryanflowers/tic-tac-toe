# tic-tac-toe

The goal of this exercise is to build a web-based Tic-Tac-Toe game that supports real-time multiplayer functionality.

REQUIREMENTS
- Any user can create a game with any other user

NOTES

- Would use nx to optimize large mono repo builds
- Service model types would be publish in some way for consumption from web
- Service would have its own models etc but for something so simple figured its overkill
- All lists would generally have paging at the least. If they were large virtual scroll is an option as to not bloat mem.
- Often useCallback and other methods would be used to stabilize the props to list render components as to not rerender needlessly. But thats not a need basis post profile.
- Authn/authz are not added here did some basic checks in the service but overall that would be necessary. If hosting everything on one domain simple cookie auth would work just need a centralized service for sessions. 
- Redis can be added to the service which can hold the games for quick access on chatty games.
- React query tends to over fetch in an effort to stay up to date. For this simple app I felt it made sense to use it in tradeoff for the complexity of using a store and keeping that in sync with the server.
- Tests are not present as I ran out of time. I can dive into my testing philosophy if interested. One thing to note about the split I tend to make in containers and dumb renderers is that it makes testing really slick. As a rule of thumb I only make this split i I have 3 or more lines of content rendered from a component. 
- Would use a component lib of some kind along with proper design tokens for theme, typography etc. I didnt want to pull in some lib wrote it raw to keep it simple. 
- Used react context to store the current user. As application state grows and knowledge of those values spreads a store that is more granular in subscriptions will become necessary but this works for now.

Things I hate

- React query requires throwing errors for non-200 responses, not a fan :(
