# Requirements Document

## Introduction

ShubhMarg lists its sacred services and Vedic tools in the mobile directory menu
(`MobileMenu.tsx`), which currently bakes emoji directly into item `name` strings
and leaves many rows with no icon at all. Emoji render inconsistently across
devices, look cheap against the bright temple aesthetic, and — because only some
rows carry one — the list reads as uneven and unfinished.

This feature replaces every emoji service icon in the mobile menu with a cohesive
set of custom, hand-drawn inline-SVG icons rendered in bright gold-ringed circular
chips. The 44 menu items (6 `SACRED_SERVICES` + 38 `VEDIC_TOOLS`) are driven by a
single source-of-truth services data module and an icon registry. Of the 44 items,
27 reuse existing bespoke icon keys and 17 receive new hand-drawn SVG glyphs. Every
glyph shares one gold stroke style on a common key-shape grid so the whole set
looks unified, matches the design-system (bright temple aesthetic, gold ring,
saffron `currentColor` glyph), and obeys the motion performance rules. The same
registry and data module are built to later feed the Header mega-dropdown and the
`/services` page without change.

## Glossary

- **ServiceEntry**: A typed record describing one menu item, shaped as
  `{ name: string, href: string, iconKey: ServiceIconName, highlight?: boolean }`.
  `name` is emoji-free, `href` begins with `/`, and `iconKey` is a compile-time
  member of `ServiceIconName`.
- **ServiceIcon**: The React component that renders one `iconKey` as a bright,
  gold-ringed circular chip containing its bespoke inline SVG glyph. This is the
  only icon component used in list rows.
- **ServiceIconName**: The registry's string-literal union of all valid icon keys
  (the existing 21 reused keys plus the new keys). One canonical key per tool.
- **Registry**: The module (`src/components/ui/service-icons/registry.ts`) that owns
  `ServiceIconName`, the `SERVICE_ICON_TITLES` map, the bespoke glyph map, the
  default glyph, and the `resolveIcon` function.
- **Bespoke glyph**: A hand-drawn inline-SVG glyph authored in-code for a specific
  icon key, using one shared gold stroke weight on a common key-shape grid, a
  transparent background, and `currentColor`, drawn from a temple/Vedic line-art
  motif.
- **Default glyph**: A single neutral inline-SVG glyph rendered only if an unknown
  (non-union) key is ever requested. It is a defensive last-resort safety net —
  never emoji, never raster, never blank.
- **Services data module**: `src/data/services.ts`, the single source of truth
  exporting `SACRED_SERVICES` and `VEDIC_TOOLS` as `ServiceEntry[]`.
- **Menu**: The mobile directory menu component (`MobileMenu.tsx`).
- **Icon chip**: The circular ivory container with a `#B8860B` gold ring that holds
  a glyph.

## Requirements

### Requirement 1: Emoji-free service and tool names

**User Story:** As an end user browsing the menu, I want service and tool names
free of emoji, so that the directory reads as a clean, premium temple experience
on any device.

#### Acceptance Criteria

1. THE Services_Data_Module SHALL define every `ServiceEntry.name` in `SACRED_SERVICES` and `VEDIC_TOOLS` as a string containing no emoji or pictographic characters.
2. WHEN the Menu renders a service or tool row, THE Menu SHALL display the item name exactly as provided by the Services_Data_Module, with no emoji character added.
3. THE Menu SHALL display no emoji character in any service name, tool name, section header, or quick-links label.

### Requirement 2: Every item renders a custom inline-SVG icon

**User Story:** As an end user browsing the menu, I want every service and tool row
to show a consistent custom icon, so that the list looks complete and crafted
rather than uneven.

#### Acceptance Criteria

1. WHEN the Menu renders a service or tool row, THE Menu SHALL render a ServiceIcon as the leading element of that row.
2. WHEN a ServiceIcon renders, THE ServiceIcon SHALL draw a bespoke inline-SVG glyph and SHALL NOT render an emoji, a raster image, or a blank placeholder.
3. WHEN a ServiceIcon renders, THE ServiceIcon SHALL display the glyph inside a circular icon chip filled with ivory `#FFFDF8` and ringed with gold `#B8860B`, and SHALL NOT render a dark boxed tile.
4. WHEN a ServiceIcon renders its glyph, THE ServiceIcon SHALL color the glyph with a saffron `currentColor` value inherited from the row.

### Requirement 3: Single source of truth for service data

**User Story:** As the site owner, I want service names, routes, and icon keys
defined exactly once, so that the menu and future consumers stay consistent and
easy to maintain.

#### Acceptance Criteria

1. THE Services_Data_Module SHALL export `SACRED_SERVICES` and `VEDIC_TOOLS` as `ServiceEntry` arrays, each entry providing a `name`, an `href`, and an `iconKey`.
2. THE Menu SHALL obtain all service and tool entries by importing them from the Services_Data_Module.
3. THE Menu SHALL NOT define an inline service or tool array and SHALL NOT hardcode any icon selection for a service or tool row.
4. THE Services_Data_Module SHALL define every `ServiceEntry.href` as a string that begins with `/`.

### Requirement 4: Icon registry resolves every key with a defensive default

**User Story:** As the site owner, I want a registry that maps every icon key to a
glyph and safely handles any unknown key, so that no row can ever render without an
icon.

#### Acceptance Criteria

1. WHEN `resolveIcon` receives an `iconKey` that is a member of `ServiceIconName`, THE Registry SHALL return a resolution of kind `svg` whose glyph is the bespoke glyph for that key.
2. WHEN `resolveIcon` receives a key that is not a member of `ServiceIconName`, THE Registry SHALL return a resolution of kind `default` whose glyph is the single neutral default glyph.
3. IF `resolveIcon` receives an unknown key, THEN THE Registry SHALL return the default glyph and SHALL NOT return a raster image, an emoji, or a null value.
4. THE Registry SHALL export `SERVICE_ICON_TITLES` providing a human-readable title for every member of `ServiceIconName`.

### Requirement 5: Design-system and motion compliance

**User Story:** As the site owner, I want the icons to match the bright temple
design-system and obey the motion rules, so that the menu feels premium and stays
smooth on mobile.

#### Acceptance Criteria

1. THE ServiceIcon SHALL render the icon chip with an ivory `#FFFDF8` fill and a `#B8860B` gold ring, and SHALL color the glyph using a saffron value from the set `#E8791E` or `#C25E10`.
2. WHERE a pointer hovers a ServiceIcon, THE ServiceIcon SHALL apply a hover effect that animates only `transform`.
3. WHILE `prefers-reduced-motion` is active, THE ServiceIcon SHALL disable the hover transform and SHALL remain fully legible as a static chip.
4. THE ServiceIcon SHALL NOT animate `width`, `height`, `box-shadow`, `top`, `left`, `margin`, or `padding`.

### Requirement 6: Unified new-icon set

**User Story:** As an end user browsing the menu, I want the newly drawn icons to
look like one coherent family, so that the directory reads as a single premium set
rather than mismatched glyphs.

#### Acceptance Criteria

1. THE Registry SHALL provide a distinct bespoke glyph for each of the 17 new icon keys, with each glyph depicting a distinct temple or Vedic motif.
2. THE Registry SHALL draw every bespoke glyph on one shared stroke weight and one shared key-shape grid with a transparent background.
3. THE Registry SHALL resolve all 27 reused icon keys to their existing bespoke glyphs without altering the reused glyph set.

### Requirement 7: Accessibility

**User Story:** As an end user relying on assistive technology or keyboard
navigation, I want each icon to be labeled and non-disruptive, so that I can
understand and operate the menu.

#### Acceptance Criteria

1. WHEN a ServiceIcon renders, THE ServiceIcon SHALL expose an `aria-label` derived from the icon title, or from a provided label when one is supplied.
2. THE ServiceIcon SHALL render the glyph as scalable inline SVG that renders correctly at any requested `size` value.
3. THE Menu SHALL preserve keyboard focus order and focus behavior of each service and tool link after the ServiceIcon is added to the row.

### Requirement 8: Performance and build integrity

**User Story:** As the site owner, I want the icons delivered as inline SVG with no
extra network cost, so that the menu loads fast and the project builds cleanly.

#### Acceptance Criteria

1. THE ServiceIcon SHALL render each glyph as inline SVG and SHALL NOT issue a network request to load a glyph.
2. WHEN the Menu renders its full set of 44 items, THE Menu SHALL render icons without loading raster image files for the glyphs.
3. WHEN the project build runs, THE Build SHALL complete with zero errors.

### Requirement 9: Preserve existing menu layout and quick-links banner

**User Story:** As an end user familiar with the menu, I want the layout and
navigation to stay the same after the icon refactor, so that only the icons change
and nothing feels broken.

#### Acceptance Criteria

1. THE Menu SHALL preserve the existing card-less menu row layout and row spacing for service and tool rows.
2. THE Menu SHALL preserve the trailing ChevronRight indicator on each tool row.
3. WHEN the Menu renders the quick-links banner, THE Menu SHALL render the calendar and chat entries with bespoke inline-SVG glyphs in place of the previous emoji.
4. WHEN the Menu renders the tools section header, THE Menu SHALL render a bespoke inline-SVG glyph in place of the previous emoji.

### Requirement 10: Reusable across future consumers

**User Story:** As the site owner, I want the registry and data module to be
reusable by the Header mega-dropdown and the `/services` page later, so that I can
extend the iconography without breaking the existing menu.

#### Acceptance Criteria

1. THE Registry SHALL expose `resolveIcon`, `ServiceIconName`, and `SERVICE_ICON_TITLES` as a stable interface consumable by contexts other than the Menu.
2. THE Services_Data_Module SHALL expose `SACRED_SERVICES` and `VEDIC_TOOLS` as a stable interface consumable by contexts other than the Menu.
3. WHERE a future consumer imports the Registry or the Services_Data_Module, THE system SHALL supply icon and service data through the same interface without requiring a change to the ServiceIcon component or the Menu.
