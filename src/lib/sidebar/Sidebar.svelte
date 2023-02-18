<script lang="ts">
    import Fa from "svelte-fa";
    import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
    import {faClose} from "@fortawesome/free-solid-svg-icons/faClose";
    import {faHome} from "@fortawesome/free-solid-svg-icons/faHome";
    import {link} from "svelte-routing";

    export let show = true;

    let collapsed = false;

    const toggleCollapsed = () => collapsed = !collapsed;

    let links = [{
        routeLink: "dashboard",
        icon: faHome,
        label: 'Dashboard'
    }];

</script>

{#if show}
    <div class="sidenav"
         class:sidenav-collapsed={collapsed}>
        <div class="sidenav-header"
             class:sidenav-collapsed={collapsed}>
            {#if !collapsed}
                <div class="menu-icon"
                     on:click={toggleCollapsed}>
                    <Fa icon={faBars}
                        size="1.2x"></Fa>
                </div>
            {:else}
                <div class="menu-icon"
                     on:click={toggleCollapsed}>
                    <Fa icon={faClose}
                        size="1.2x"></Fa>
                </div>
            {/if}
        </div>
        <div class="divider"></div>
        <ul class="sidenav-wrapper">
            {#each links as l}
                <li class="sidenav-item-wrapper">
                    <a href={l.routeLink}
                       class="sidenav-item-link"
                       use:link>
                        <div class="sidenav-item">
                            <div class="sidenav-item-icon">
                                <Fa icon="{l.icon}"
                                    size="1.2x"
                                />
                            </div>
                            <div class="sidenav-item-label"
                                 class:sidenav-collapsed={collapsed}>{l.label}
                            </div>
                        </div>
                    </a>
                </li>
            {/each}
        </ul>
    </div>
{/if}

<style lang="scss">
  @import "src/assets/constants";

  .sidenav {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 5rem;
    background-color: $sidebar-background;
    color: $sidebar-font;
    padding: 2.5rem 1rem;
    position: relative;
    transition: width 0.3s;
    z-index: 1;

    &.sidenav-collapsed {
      width: 16.5625rem;
    }

    .sidenav-header {
      display: flex;
      flex-direction: row;
      justify-content: center;

      &.sidenav-collapsed {
        justify-content: flex-end;
      }

      .menu-icon {
        display: flex;
        width: 32px;
        height: 32px;
        border-radius: 0.75rem;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &:hover {
          .ng-fa-icon {
            color: $sidebar-item-hover;
          }
        }
      }
    }

    .divider {
      background-color: $sidebar-item-hover-background;
      margin: 0.5rem 0;
    }

    .sidenav-wrapper {
      list-style-type: none;
      padding: 0;

      .sidenav-item-wrapper {
        border-radius: 0.75rem;
        width: 100%;
        height: 48px;
        text-align: center;
        transition: color .3s ease, background-color .3s ease;
        cursor: pointer;

        &:hover, &.active {
          background-color: $sidebar-item-hover-background;

          .sidenav-item-link {
            color: $sidebar-item-hover;
          }
        }

        .sidenav-item {
          display: flex;
          flex-direction: row;
          padding-top: 0.8rem;
          justify-content: center;
        }

        .sidenav-item-link {
          text-decoration: none;
          color: $sidebar-font;
        }

        .sidenav-item-label {
          display: inline-block;
          max-width: 0;
          overflow: hidden;
          opacity: 0;
          padding: 0;
          font-size: 1.25rem;
          font-weight: 400;
          transition: padding-right .3s ease,
          max-width .3s ease,
          padding-left .3s ease,
          opacity .3s ease;
          line-height: 28px;

          &.sidenav-collapsed {
            overflow: hidden;
            padding: 0 .5rem;
            max-width: 100%;
            opacity: 1;
          }
        }
      }
    }
  }
</style>