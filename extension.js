// A function to sleep for `ms` miliseconds
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// A function to simulate a mouse click on `element`
const mouseClickEvents = ['mousedown', 'click', 'mouseup'];
async function simulateMouseClick(element) {
    try {
        mouseClickEvents.forEach(mouseEventType =>
            element.dispatchEvent(new MouseEvent(mouseEventType, { view: window, bubbles: true, cancelable: true, buttons: 1 }))
        );
    } catch (e) { }
}

// A function to trigger simulated mouse clicks on all open sidebar windows
async function rightSidebarCollapseWindow(iWindow = 0) {
    //iWindow = 0 to close all windows, otherwise the number of the window to close
    if (await roamAlphaAPI.ui.rightSidebar.getWindows().length > 0) {
        await roamAlphaAPI.ui.rightSidebar.open();
        await sleep(250);
        var panes = document.querySelectorAll('.sidebar-content .rm-caret-open');
        if (iWindow == 0) {
            let numberOfPanes = panes.length;
            for (let i = 0; i <= numberOfPanes - 1; i++) {
                simulateMouseClick(document.querySelector('.sidebar-content .rm-caret-open'));
                await sleep(100);
            }
        } else {
            simulateMouseClick(panes[iWindow - 1]);
        }
        await sleep(300);
    }
}

// A function to trigger simulated mouse clicks on all open sidebar windows
async function rightSidebarExpandWindow(iWindow = 0) {
    //iWindow = 0 to close all windows, otherwise the number of the window to close
    if (await roamAlphaAPI.ui.rightSidebar.getWindows().length > 0) {
        await roamAlphaAPI.ui.rightSidebar.open();
        await sleep(250);
        var panes = document.querySelectorAll('.sidebar-content .rm-caret-closed');
        if (iWindow == 0) {
            let numberOfPanes = panes.length;
            for (let i = 0; i <= numberOfPanes - 1; i++) {
                simulateMouseClick(document.querySelector('.sidebar-content .rm-caret-closed'));
                await sleep(100);
            }
        } else {
            simulateMouseClick(panes[iWindow - 1]);
        }
        await sleep(300);
    }
}

// A function to trigger simulated mouse clicks on all open sidebar windows
async function rightSidebarCloseWindow(iWindow = 0) {
    //iWindow = 0 to close all windows, otherwise the number of the window to close
    if (await roamAlphaAPI.ui.rightSidebar.getWindows().length > 0) {
        await roamAlphaAPI.ui.rightSidebar.open();
        await sleep(250);
        var panes = document.querySelectorAll('.sidebar-content .bp3-icon-cross');
        if (iWindow == 0) {
            let numberOfPanes = panes.length;
            for (let i = 0; i <= numberOfPanes - 1; i++) {
                simulateMouseClick(document.querySelector('.sidebar-content .bp3-icon-cross'));
                await sleep(100);
            }
        } else {
            simulateMouseClick(panes[iWindow - 1]);
        }
        await sleep(300);
    }
}

// A function to trigger simulated mouse clicks on all open sidebar windows
async function linkedReferencesCollapse(iWindow = 0) {
    //iWindow = 0 to collapse all linked references, otherwise the number of the references to close
    var references = document.querySelectorAll('.rm-title-arrow-wrapper .bp3-icon-caret-down.rm-caret-open');
    if (iWindow == 0) {
        let numberOfRefs = references.length;
        for (let i = 0; i <= numberOfRefs - 1; i++) {
            simulateMouseClick(document.querySelector('.rm-title-arrow-wrapper .bp3-icon-caret-down.rm-caret-open'));
            await sleep(100);
        }
    } else {
        simulateMouseClick(panes[iWindow - 1]);
    }
    await sleep(300);
}

// A function to trigger simulated mouse clicks on all open sidebar windows
async function linkedReferencesExpand(iWindow = 0) {
    //iWindow = 0 to collapse all linked references, otherwise the number of the references to close
    var references = document.querySelectorAll('.rm-title-arrow-wrapper .bp3-icon-caret-down.rm-caret-closed');
    if (iWindow == 0) {
        let numberOfRefs = references.length;
        for (let i = 0; i <= numberOfRefs - 1; i++) {
            simulateMouseClick(document.querySelector('.rm-title-arrow-wrapper .bp3-icon-caret-down.rm-caret-closed'));
            await sleep(100);
        }
    } else {
        simulateMouseClick(panes[iWindow - 1]);
    }
    await sleep(300);
}

function loadCommands() {
    // Registers the rightSideBarCloseWindow function in the Roam Command Palette 
    // with the label 'Right Sidebar Collapse Windows (rscw)'
    try {
        roamAlphaAPI.ui.commandPalette.addCommand({
            label: 'Right Sidebar Collapse Windows (rscolw)',
            callback: async () => { await rightSidebarCollapseWindow(0); }
        })
    } catch (e) { };
    
    // Registers the rightSideBarCloseWindow function in the Roam Command Palette 
    // with the label 'Right Sidebar Collapse Windows (rscw)'
    try {
        roamAlphaAPI.ui.commandPalette.addCommand({
            label: 'Right Sidebar Expand Windows (rsexpw)',
            callback: async () => { await rightSidebarExpandWindow(0); }
        })
    } catch (e) { };

    // Registers the rightSideBarCloseWindow function in the Roam Command Palette 
    // with the label 'Right Sidebar Close Windows (rscw)'
    try {
        roamAlphaAPI.ui.commandPalette.addCommand({
            label: 'Right Sidebar Close Windows (rsclsw)',
            callback: async () => { await rightSidebarCloseWindow(0); }
        })
    } catch (e) { };

    // Registers the rightSideBarCloseWindow function in the Roam Command Palette 
    // with the label 'Right Sidebar Close Windows (rscw)'
    try { 
        roamAlphaAPI.ui.commandPalette.addCommand({ 
            label: 'Linked References Collapse (refcol)', 
            callback: async () => { await linkedReferencesCollapse(0); } }) 
    } catch (e) { };

    // Registers the rightSideBarExpandWindow function in the Roam Command Palette 
    // with the label 'Right Sidebar Close Windows (rscw)'
    try { 
        roamAlphaAPI.ui.commandPalette.addCommand({ 
            label: 'Linked References Expand (refexp)', 
            callback: async () => { await linkedReferencesExpand(0); } }) 
    } catch (e) { };
};

function unloadCommands() {
    // Registers the rightSideBarCloseWindow function in the Roam Command Palette 
    // with the label 'Right Sidebar Collapse Windows (rscw)'
    try {
        roamAlphaAPI.ui.commandPalette.removeCommand({
            label: 'Right Sidebar Collapse Windows (rscolw)'
        })
    } catch (e) { };
    
    // Registers the rightSideBarCloseWindow function in the Roam Command Palette 
    // with the label 'Right Sidebar Collapse Windows (rscw)'
    try {
        roamAlphaAPI.ui.commandPalette.removeCommand({
            label: 'Right Sidebar Expand Windows (rsexpw)'
        })
    } catch (e) { };

    // Registers the rightSideBarCloseWindow function in the Roam Command Palette 
    // with the label 'Right Sidebar Close Windows (rscw)'
    try {
        roamAlphaAPI.ui.commandPalette.removeCommand({
            label: 'Right Sidebar Close Windows (rsclsw)'
        })
    } catch (e) { };

    // Registers the rightSideBarCloseWindow function in the Roam Command Palette 
    // with the label 'Right Sidebar Close Windows (rscw)'
    try { 
        roamAlphaAPI.ui.commandPalette.removeCommand({ 
            label: 'Linked References Collapse (refcol)'
        })
    } catch (e) { };

    // Registers the rightSideBarExpandWindow function in the Roam Command Palette 
    // with the label 'Right Sidebar Close Windows (rscw)'
    try { 
        roamAlphaAPI.ui.commandPalette.removeCommand({ 
            label: 'Linked References Expand (refexp)'
        })
    } catch (e) { };
};

export default {
    onload: loadCommands(),
    onunload: unloadCommands()
};