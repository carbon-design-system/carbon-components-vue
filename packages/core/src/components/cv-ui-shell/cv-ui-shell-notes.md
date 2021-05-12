# CvHeader

A Vue implementation of a Carbon Components Header

- https://www.carbondesignsystem.com/components/UI-shell-header/usage
- https://www.carbondesignsystem.com/components/UI-shell-left-panel/usage
- https://www.carbondesignsystem.com/components/UI-shell-right-panel/usage

## Usage

### Header

Header bar only

```HTML
<cv-header aria-label="Carbon header">
  <!-- slotted content goes here -->
</cv-header>
```

### Application name and skip to content

For slotting into cv-header.

```HTML
  <!-- optional skipt to content -->
  <cv-skip-to-content href="#main-content">
    Skip to content
  </cv-skip-to-content>

  <!-- optional -->
  <cv-header-name href="javascript:void(0)" prefix="IBM">
    &nbsp;[Platform]
  </cv-header-name>
```

Both cv-header-name and cv-skip-to-content can be used with either 'href' or 'to' attributes. The latter as per the cv-link component produces a router-link instead of an anchor tag.

### Header Nav

For slotting into cv-header.

```HTML
  <cv-header-nav aria-label="Carbon nav">
    <!-- active for current or active location -->
    <cv-header-menu-item href="javascript:void(0)" active>
      Link 1
    </cv-header-menu-item>
    <cv-header-menu-item href="javascript:void(0)">
      Link 2
    </cv-header-menu-item>
    <cv-header-menu-item href="javascript:void(0)">
      Link 3
    </cv-header-menu-item>
    <cv-header-menu aria-label="Link 4">
      <cv-header-menu-item href="javascript:void(0)">
        Submenu Link 1
      </cv-header-menu-item>
      <cv-header-menu-item href="javascript:void(0)">
        Submenu Link 2
      </cv-header-menu-item>
      <cv-header-menu-item href="javascript:void(0)">
        Submenu Link 3
      </cv-header-menu-item>
    </cv-header-menu>
  </cv-header-nav>
```

Links behave as per cv-link (expect 'href' or 'to' attributes).

NOTE: Header nav links should be shown at the top of the side nav before other content. This is NOT done automatically.

### Global Actions and Right Panels

For slotting into cv-header.

```HTML
  <!-- Global actions displayed on the right of the header -->
  <template slot="header-global">
    <cv-header-global-action
      aria-label="Notifications"
      aria-controls="notifications-panel"
      @click="actionNotifications" >
      <Notification20 />
    </cv-header-global-action>
    <cv-header-global-action aria-label="User avatar" @click="actionUserAvatar" aria-controls="user panel">
      <UserAvatar20 />
    </cv-header-global-action>
    <cv-header-global-action
      aria-label="App switcher"
      aria-controls="switcher-panel"
      @click="actionAppSwitcher">
      <AppSwitcher20 />
    </cv-header-global-action>
  </template>

  <!-- The right panels are placed in the 'right-panels' slot -->
  <template slot="right-panels">

    <!-- The 'id' of hte panel is used to  link the 'aria-controls' of the global action -->
    <!-- You DO NOT need to wire this up yourself -->
    <cv-header-panel  id="notifications-panel">
      An empty panel
    </cv-header-panel>

    <cv-header-panel  id="user-panel">
      An empty panel
    </cv-header-panel>

    <cv-header-panel id="switcher-panel">
    <!-- A switcher panel typically contains links. Use cv-switcher, cv-switcher-item and cv-switcher-item-link to add these -->
      <cv-switcher>
        <cv-switcher-item>
          <cv-switcher-item-link href="javascript:void(0)" selected>
            Selected app
          </cv-switcher-item-link>
        </cv-switcher-item>
        <cv-switcher-item>
          <cv-switcher-item-link href="javascript:void(0)">
            Other app
          </cv-switcher-item-link>
        </cv-switcher-item>
        <cv-switcher-item>
          <cv-switcher-item-link href="javascript:void(0)">
            Other app
          </cv-switcher-item-link>
        </cv-switcher-item>
        <cv-switcher-item>
          <cv-switcher-item-link href="javascript:void(0)">
            Other app
          </cv-switcher-item-link>
        </cv-switcher-item>
        <cv-switcher-item>
          <cv-switcher-item-link href="javascript:void(0)">
            Other app
          </cv-switcher-item-link>
        </cv-switcher-item>
        <cv-switcher-item>
          <cv-switcher-item-link href="javascript:void(0)">
            Other app
          </cv-switcher-item-link>
        </cv-switcher-item>
      </cv-switcher>
    </cv-header-panel>
  </template>
```

Panels and global actions are automatically wired up via the cv-header component.

NOTE: Right panels need to be added into the 'right-panels' slot.
NOTE: Links behave as per cv-link (expect 'href' or 'to' attributes).

### Side Nav (left)

Can be added either into the headers 'left-panels' slot or stand alone.

```HTML
  <!-- Optional - use when side-nav is expected to expand/hide.
  Wired up via id and aria-controls -->
  <cv-header-menu-button aria-label="Header menu" aria-controls="side-nav" />

  <template slot="left-panels">
    <!-- Can be used with or without a header, has hover expand abiliity without -->
    <cv-side-nav id="side-nav">

      <cv-header-side-nav-items v-if="header_nav_contents">
        <!-- Duplicate header nav contents in cv-header-side-nav-items -->
        <!-- otherwise omit -->
      </cv-header-side-nav-items>

      <!-- Use cv-side-nav-items to create a child menu -->
      <cv-side-nav-items>
        <cv-side-nav-menu title="L1 menu">
          <!-- icons can be used with the side nav -->
          <template slot="nav-icon"><Fade16 /></template>
          <cv-side-nav-menu-item href="javascript:void(0)" active>
            L2 menu item
          </cv-side-nav-menu-item>
          <cv-side-nav-divider />
          <cv-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </cv-side-nav-menu-item>
          <cv-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </cv-side-nav-menu-item>
        </cv-side-nav-menu>
        <cv-side-nav-divider />
        <cv-side-nav-menu title="L1 menu" expanded>
          <template slot="nav-icon"><Fade16 /></template>
          <cv-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </cv-side-nav-menu-item>
          <cv-side-nav-menu-item href="javascript:void(0)" aria-current="page">
            L2 menu item
          </cv-side-nav-menu-item>
          <cv-side-nav-menu-item href="javascript:void(0)">
            L2 menu item
          </cv-side-nav-menu-item>
        </cv-side-nav-menu>
        <cv-side-nav-link href="javascript:void(0)">
          <template slot="nav-icon"><Fade16 /></template>
          L1 link
        </cv-side-nav-link>
        <cv-side-nav-link href="javascript:void(0)">
          <template slot="nav-icon"><Fade16 /></template>
          L1 link
        </cv-side-nav-link>
      </cv-side-nav-items>
    </cv-side-nav>
  </template>
```

### options

- CvSideNav can be passed the boolean attribute 'rail' this switches the side nav into rail form.
- CvHeaderSideNavItems can be passed the boolean attribute 'divider' which will add a dividing
- cv-side-nav-menu can be passed the boolean attribute 'expanded' that sets the expanded state of the menu
