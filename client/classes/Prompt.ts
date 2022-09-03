class Prompt {
  private promptName: string;
  private promptText: string;
  private promptControl: number;
  private isActive: boolean;
  private isEnabled: boolean;
  private promptHandle: number;

  constructor(
    promptHandle: number,
    promptName: string,
    promptText: string,
    promptControl: number,
    isActive: boolean,
    isEnabled: boolean
  ) {
    this.promptHandle = promptHandle;
    this.promptName = promptName;
    this.promptText = promptText;
    this.promptControl = promptControl;
    this.isActive = isActive;
    this.isEnabled = isEnabled;
    Citizen.invokeNative(
      "0x8A0FB4D03A630D21",
      this.promptHandle,
      this.isEnabled
    );
    Citizen.invokeNative(
      "0x71215ACCFDE075EE",
      this.promptHandle,
      this.isActive
    );
    Citizen.invokeNative(
      "0xB5352B7494A08258",
      this.promptHandle,
      this.promptControl
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const str = CreateVarString(10, "LITERAL_STRING", this.promptText);
    Citizen.invokeNative("0x5DD02A8318420DD7", this.promptHandle, str);
  }

  public isPromptEnabled() {
    return this.isEnabled;
  }

  public setPromptEnabled(enabled: boolean) {
    Citizen.invokeNative("0x8A0FB4D03A630D21", this.promptHandle, enabled);
    this.isEnabled = enabled;
  }

  public setPromptVisible(visible: boolean) {
    Citizen.invokeNative("0x71215ACCFDE075EE", this.promptHandle, visible);
    this.isActive = visible;
  }

  public getPromptHandle() {
    return this.promptHandle;
  }

  public isPromptVisible() {
    return this.isActive;
  }
}

class PromptManager {
  private prompts: Map<string, Prompt> = new Map();

  public createPrompt(
    promptName: string,
    promptText: string,
    promptControl: number
  ): void {
    const promptHandle = Citizen.invokeNative<number>("0x04F97DE45A519419");
    const newPrompt = new Prompt(
      promptHandle,
      promptName,
      promptText,
      promptControl,
      false,
      false
    );
    this.prompts.set(promptName, newPrompt);
    Citizen.invokeNative("0xF7AA2696A22AD8B9", promptHandle);
  }

  public getPromptHandle(promptName: string): Prompt {
    const prompt = this.prompts.get(promptName);
    return prompt;
  }
}

const promptManager = new PromptManager();
export default promptManager;