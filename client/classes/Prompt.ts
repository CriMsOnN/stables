class Prompt {
  private promptName: string;
  private promptText: string;
  private promptControl: number;
  private isActive: boolean;
  private isEnabled: boolean;
  private promptHandle: number;

  constructor(promptHandle: number, promptName: string, promptText: string, promptControl: number, isActive: boolean, isEnabled: boolean) {
    this.promptHandle = promptHandle;
    this.promptName = promptName;
    this.promptText = promptText;
    this.promptControl = promptControl;
    this.isActive = isActive;
    this.isEnabled = isEnabled;
    const str = CreateVarString(10, 'LITERAL_STRING', this.promptText);
    PromptSetEnabled(this.promptHandle, this.isEnabled);
    PromptSetVisible(this.promptHandle, this.isActive);
    PromptSetControlAction(this.promptHandle, this.promptControl);
    PromptSetText(this.promptHandle, str);
  }

  public isPromptEnabled() {
    return this.isEnabled;
  }

  public setPromptToGroup(groupId: number) {
    PromptSetGroup(this.promptHandle, groupId, null);
  }

  public setPromptEnabled(enabled: boolean) {
    PromptSetEnabled(this.promptHandle, enabled);
    this.isEnabled = enabled;
  }

  public setPromptVisible(visible: boolean) {
    PromptSetVisible(this.promptHandle, visible);
    this.isActive = visible;
  }

  public getPromptHandle() {
    return this.promptHandle;
  }

  public isPromptVisible() {
    return this.isActive;
  }

  public setHoldMode(hold: boolean) {
    PromptSetHoldMode(this.promptHandle, hold);
  }

  public hasHoldModeCompleted() {
    return PromptHasHoldModeCompleted(this.promptHandle);
  }
}

class PromptManager {
  private prompts: Map<string, Prompt> = new Map();

  public createPrompt(promptName: string, promptText: string, promptControl: number): Prompt {
    const promptHandle = PromptRegisterBegin();
    const newPrompt = new Prompt(promptHandle, promptName, promptText, promptControl, false, false);
    this.prompts.set(promptName, newPrompt);
    PromptRegisterEnd(promptHandle);
    return newPrompt;
  }

  public getPromptHandle(promptName: string): Prompt {
    const prompt = this.prompts.get(promptName);
    return prompt;
  }
}

const promptManager = new PromptManager();
export default promptManager;
