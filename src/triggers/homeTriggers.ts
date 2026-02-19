import {
  triggerRegistry,
  type TriggerFunction,
} from "@/registry/triggerRegistry";

// TODO: ONLY TRIGGER STUBS --> IMPLEMENT

const homeTriggerOption: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerOption] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Populate system select options based on selected option/version
};

const homeTriggerSystem: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerSystem] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Populate account/project/partition based on selected system
};

const homeTriggerSystemChanged: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerSystemChanged] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: React to system selection change — reset dependent fields
};

const homeTriggerAccount: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerAccount] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Fetch accounts for system, populate account select
};

const homeTriggerProject: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerProject] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Fetch projects for selected account, populate project select
};

const homeTriggerPartition: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerPartition] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Fetch partitions for selected project, populate partition select
};

const homeTriggerReservation: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerReservation] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Fetch reservations for selected partition
};

const homeTriggerReservationInfo: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerReservationInfo] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Show reservation details
};

const homeTriggerReservationObserveCollect: TriggerFunction = async (
  value,
  ctx,
) => {
  console.log(
    `[trigger:homeTriggerReservationObserveCollect] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Observe collect attribute changes on reservation
};

const homeTriggerFlavor: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerFlavor] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Fetch flavors for selected system
};

const homeTriggerFlavorInfo: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerFlavorInfo] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Show flavor resource info
};

const homeTriggerRepoTypeChanged: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerRepoTypeChanged] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Update repo URL placeholder/pattern based on repo type
};

const homeTriggerUpdateRepoUrlForType: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerUpdateRepoUrlForType] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Update repo URL field based on selected type
};

const homeTriggerUpdateDirectLinks: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerUpdateDirectLinks] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Rebuild the direct-link URL from repo fields
};

const homeTriggerRepoPathType: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerRepoPathType] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Toggle repo path type between file and URL
};

const homeTriggerRTCChanged: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerRTCChanged] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Toggle RTC-related UI, disable HPC systems
};

const toggleExternalCB: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:toggleExternalCB] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Toggle visibility of private registry username/password
};

const homeTriggerModules: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerModules] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Refresh module checkboxes based on system/option selection
};

const homeTriggerResources: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerResources] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Update resource min/max/defaults based on system/partition
};

const homeTriggerNavbarResources: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerNavbarResources] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Show/hide resources navbar tab
};

const homeTriggerButtonShare: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerButtonShare] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Open share dialog
};

const homeTriggerButtonRTC: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerButtonRTC] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Toggle RTC button state
};

const homeTriggerButtonStartGreen: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerButtonStartGreen] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Submit the form / start the server
};

const homeTriggerButtonSave: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerButtonSave] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Save current configuration
};

const homeTriggerButtonReset: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerButtonReset] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Reset form to defaults
};

const homeTriggerButtonDelete: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeTriggerButtonDelete] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Delete the configuration
};

const homeSummaryButtonManage: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeSummaryButtonManage] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Expand config row
};

const homeSummaryButtonStop: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeSummaryButtonStop] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Stop running server
};

const homeSummaryButtonOpen: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeSummaryButtonOpen] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Open running server in new tab
};

const homeSummaryButtonCancel: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeSummaryButtonCancel] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Cancel pending spawn
};

const homeSummaryButtonDel: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeSummaryButtonDel] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Delete named server
};

const homeSummaryButtonStart: TriggerFunction = async (value, ctx) => {
  console.log(
    `[trigger:homeSummaryButtonStart] field=${ctx.fieldName} value=`,
    value,
  );
  // TODO: Start named server
};

export function registerHomeTriggers() {
  // Lab config
  triggerRegistry.register("homeTriggerOption", homeTriggerOption);
  triggerRegistry.register("homeTriggerSystem", homeTriggerSystem);
  triggerRegistry.register(
    "homeTriggerSystemChanged",
    homeTriggerSystemChanged,
  );
  triggerRegistry.register("homeTriggerAccount", homeTriggerAccount);
  triggerRegistry.register("homeTriggerProject", homeTriggerProject);
  triggerRegistry.register("homeTriggerPartition", homeTriggerPartition);
  triggerRegistry.register("homeTriggerReservation", homeTriggerReservation);
  triggerRegistry.register(
    "homeTriggerReservationInfo",
    homeTriggerReservationInfo,
  );
  triggerRegistry.register(
    "homeTriggerReservationObserveCollect",
    homeTriggerReservationObserveCollect,
  );
  triggerRegistry.register("homeTriggerFlavor", homeTriggerFlavor);
  triggerRegistry.register("homeTriggerFlavorInfo", homeTriggerFlavorInfo);

  // Repo / RTC
  triggerRegistry.register(
    "homeTriggerRepoTypeChanged",
    homeTriggerRepoTypeChanged,
  );
  triggerRegistry.register(
    "homeTriggerUpdateRepoUrlForType",
    homeTriggerUpdateRepoUrlForType,
  );
  triggerRegistry.register(
    "homeTriggerUpdateDirectLinks",
    homeTriggerUpdateDirectLinks,
  );
  triggerRegistry.register("homeTriggerRepoPathType", homeTriggerRepoPathType);
  triggerRegistry.register("homeTriggerRTCChanged", homeTriggerRTCChanged);
  triggerRegistry.register("toggleExternalCB", toggleExternalCB);

  // Modules
  triggerRegistry.register("homeTriggerModules", homeTriggerModules);

  // Resources
  triggerRegistry.register("homeTriggerResources", homeTriggerResources);
  triggerRegistry.register(
    "homeTriggerNavbarResources",
    homeTriggerNavbarResources,
  );

  // Buttons
  triggerRegistry.register("homeTriggerButtonShare", homeTriggerButtonShare);
  triggerRegistry.register("homeTriggerButtonRTC", homeTriggerButtonRTC);
  triggerRegistry.register(
    "homeTriggerButtonStartGreen",
    homeTriggerButtonStartGreen,
  );
  triggerRegistry.register("homeTriggerButtonSave", homeTriggerButtonSave);
  triggerRegistry.register("homeTriggerButtonReset", homeTriggerButtonReset);
  triggerRegistry.register("homeTriggerButtonDelete", homeTriggerButtonDelete);

  // Summary row buttons
  triggerRegistry.register("homeSummaryButtonManage", homeSummaryButtonManage);
  triggerRegistry.register("homeSummaryButtonStop", homeSummaryButtonStop);
  triggerRegistry.register("homeSummaryButtonOpen", homeSummaryButtonOpen);
  triggerRegistry.register("homeSummaryButtonCancel", homeSummaryButtonCancel);
  triggerRegistry.register("homeSummaryButtonDel", homeSummaryButtonDel);
  triggerRegistry.register("homeSummaryButtonStart", homeSummaryButtonStart);
}
