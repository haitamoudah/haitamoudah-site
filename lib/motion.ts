/* shared between the DOM chrome (gsap ticker) and the 3D scene (useFrame).
   the ticker writes, the scene reads. plain mutable object, no react state:
   these values change every frame. */

export const TOTAL_TRAVEL = 3400;
export const IDLE_DRIFT = 11;
export const DAMP = 0.07;

export const motionState = {
  /* raw scroll progress 0..1 */
  target: 0,
  /* damped progress. lerps toward target; direct binding feels cheap */
  p: 0,
  /* world units down the corridor */
  travel: 0,
  reduced: false,
};
