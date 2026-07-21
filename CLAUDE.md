@AGENTS.md

# haitamoudah.com

personal site for haitam oudah, software developer. one page, continuous scroll,
wireframe-corridor 3D background. goal: get taken seriously by hiring managers
and freelance clients.

## design source of truth
`design/visual-reference.html` — a working prototype of the intended look.
match it. do not redesign it.

## tokens
bg #05080b · accent #8fd9fb · dim #2f566b · ink #dce8f1 · muted #77899a

## hard rules
- all display text is lowercase. correct punctuation otherwise.
- JetBrains Mono throughout, weights 300/400/500/700. it is the only typeface.
  display sizes need weight 700 and letter-spacing -.045em or they look spindly.
  body needs line-height 1.85 and max-width 46ch. do not scale body copy back up.
- CRT treatment stays subtle: faint scanlines + vignette. no flicker,
  no chromatic aberration, no screen curvature.
- content strings live in `content/site.ts`, never inline in JSX.
- no em dashes anywhere. use a full stop, colon, or comma.
- copy in design/visual-reference.html is final. move it, don't rewrite it.
- 3D is decoration. text must render and be readable before the canvas loads.
- never invent facts about haitam. leave a visible TODO instead.
- no console errors. `npm run build` must pass clean.

## perf budget
lighthouse mobile perf >= 85, a11y >= 95, LCP < 2.5s, CLS < 0.02.
cap DPR at 1.8 desktop / 1.3 mobile. pause the render loop when the tab is hidden.