import {Component, Input, OnInit, HostListener, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {AccountUsersService} from "../../account/account-users.service";
import {Observable} from "rxjs/Observable";
import {ISubAccount} from "ht-models";
import {IOnBoardingCodeSnippet, IOnBoardingStep, IOnBoardingSubStep} from "../../model/onboarding";
import {OnboardingService} from "../onboarding.service";
import * as _ from 'underscore';
import {dummyCodeSnippet} from '../content/dummy/dummy.code';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs/Subject";
declare let hljs: any;
var HighlightJS = hljs;let ClipboardJS = require('clipboard');
let marked = require('marked');
require("!style-loader!css-loader!../../../style/highlightjs/atom-one-light.css");

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.less'],
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)'
  }
})
export class OnboardingComponent implements OnInit {
  @Input() steps: IOnBoardingStep[];
  @Input() platform: string;
  @Input() showPlatformPicker: boolean = false;
  @Input() globalOptionId: string;
  @Input() stepIterationCount: number = 0;
  @Output() nextState: EventEmitter<any> = new EventEmitter();
  logos = {
    cordova: require('../../../assets/image/cordova-logo.png'),
    react: require('../../../assets/image/react-logo.png'),
    android: require('../../../assets/image/android-logo.png'),
    apple: require('../../../assets/image/apple-logo.png')
  };
  codeSnippet$:  Subject<any>;
  platformLogo;
  codeChanged: boolean = false;
  blurCode: boolean = true;
  subAccount$: Observable<ISubAccount>;
  pkValue: string;
  state: any;
  prevButtonLabel: string = "Previous";
  constructor(
    private accountUserService: AccountUsersService,
    private onBoardingService: OnboardingService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.subAccount$ = this.accountUserService.getSubAccount();
    this.subAccount$.take(1).subscribe((subAccount: ISubAccount) => {
      if (subAccount && subAccount.tokens) {
        let pkToken = subAccount.tokens.find((token) => token.scope === 'publishable' );
        this.pkValue = pkToken ? pkToken.key : null;
      }
    });
  }

  handleKeyboardEvent(event) {
    if (event.code === "ArrowRight") {
      this.onNextStepAction(true);
    } else if (event.code === "ArrowLeft") {
      this.onPreviousStepAction(true);
    }
  }

  ngOnInit() {
    this.codeSnippet$ = new Subject();
    this.codeSnippet$.switchMap((state) => {
      return this.fetchCodeFromURL(state.code.fileURL).map((fileData) => {
        return {
          fileData,
          state
        }
      });
    }).subscribe((data) => {
      this.updateCodeInState(data.fileData, data.state);
      this.updateFileContentForStep(data.state, data.fileData);
    });
    let stepParams = this.getCurrentStepFromParams();
    this.setState(stepParams);
    this.platformLogo = this.getPlatformLogo();
  }

  ngOnChanges() {
    if (this.state && Number.isInteger(this.state.stepIndex) && Number.isInteger(this.state.subStepIndex)) {
      this.setState({
        stepIndex: this.state.stepIndex,
        subStepIndex: this.state.subStepIndex
      });
    }
  }

  getCurrentStepFromParams() {
    let params = this.route.snapshot.params;
    let stepIndex = 0;
    let subStepIndex = 0;
    if (params && params.step) {
      let paramArray = params.step.split(".");
      if (paramArray.length === 2) {
        stepIndex = parseInt(paramArray[0]);
        subStepIndex = parseInt(paramArray[1]);
        if (!this.steps[stepIndex] || !this.steps[stepIndex].subSteps[subStepIndex]) {
          stepIndex = 0;
          subStepIndex = 0;
        }
      }
    }
    return {
      stepIndex,
      subStepIndex
    };
  }

  getPlatformLogo() {
    switch(this.platform) {
      case 'android':
        return this.logos.android;
      case 'ios':
        return this.logos.apple;
      case 'react-native':
        return this.logos.react;
      case 'cordova':
        return this.logos.cordova;
      default:
        return null
    }
  }

  jumpToPlatformPicker() {
    this.router.navigate(['/onboarding/platform']);
  }

  setState(stepParams) {
    this.state = {
      step: this.getStep(stepParams.stepIndex),
      subStep: this.getSubStep(stepParams.stepIndex, stepParams.subStepIndex),
      title: this.getStepTitle(stepParams.stepIndex, stepParams.subStepIndex),
      showSubStepNavigation: this.getStep(stepParams.stepIndex).subSteps.length > 1,
      stepIndex: stepParams.stepIndex,
      subStepIndex: stepParams.subStepIndex,
      totalSubSteps: this.getTotalSubStepsForStep(stepParams.stepIndex),
      subStepLeftContent: this.getSubStepContent(stepParams.stepIndex, stepParams.subStepIndex),
      globalOptionId: this.globalOptionId,
      code: this.getCodeState(stepParams),
      image: this.getImageState(stepParams)
    };
    this.nextState.emit(this.state);
    this.showBouncingArrow(false);
    if (this.isRightPaneCode(stepParams.stepIndex, stepParams.subStepIndex)) {
      this.updateCode(this.state);
    }
    this.router.navigate([
        {...this.route.snapshot.params, step: `${this.state.stepIndex}.${this.state.subStepIndex}`}
      ],
      {relativeTo: this.route, queryParamsHandling: null}
    );
    if (this.state.stepIndex === 0 && this.state.subStepIndex === 0) {
      this.prevButtonLabel = "I'm not a developer";
    } else {
      this.prevButtonLabel = "Previous";
    }
  }

  getImageState(stepParams) {
    let subStep = this.getSubStep(stepParams.stepIndex, stepParams.subStepIndex);
    if (subStep.rightPane.type === 'image') {
      return {
        fileSrc: subStep.rightPane.data.fileSrc
      };
    }
    return {};
  }

  getCodeState(stepParams) {
    let codeMetadata = this.getCodeMetadata(stepParams.stepIndex, stepParams.subStepIndex, this.globalOptionId);
    let codeState = {};
    if (this.isRightPaneCode(stepParams.stepIndex, stepParams.subStepIndex)) {
      codeState = {
        options: this.getCodeOptions(stepParams.stepIndex, stepParams.subStepIndex, this.globalOptionId),
        fileName: codeMetadata.fileName,
        fileURL: codeMetadata.fileURL,
        fileLinkUrl: codeMetadata.fileLinkUrl,
        fileContent: codeMetadata.fileContent,
        copyLines: codeMetadata.lines,
        language: codeMetadata.language,
        additions: this.getCodeAdditionsText(codeMetadata.lines.length),
        blurCode: this.blurCode,
        element: this.createCodeElement(this.getDummyCodeSnippet(), 'gradle', true),
        snippets: []
      }
    }
    return codeState;
  }

  isRightPaneCode(stepIndex, subStepIndex) {
    return this.getSubStep(stepIndex, subStepIndex).rightPane.type === 'code';
  }

  updateCode(state) {
    if (state.code.fileContent || state.code.fileContent === "") {
      this.updateCodeInState(state.code.fileContent, state)
    } else {
      this.codeSnippet$.next(state);
    }
  }

  updateCodeInState(fileData, state) {
    let copyLines = state.code.copyLines;
    let codeSnippets = this.createCodeSnippetsWithData(fileData, copyLines);
    let language = state.code.language;
    if (this.state.stepIndex === state.stepIndex && this.state.subStepIndex === state.subStepIndex) {
      this.state = {
        ...state,
        code: {
          ...state.code,
          element: this.createCodeElement(codeSnippets, language),
          snippets: codeSnippets
        }
      };
      this.codeChanged = true;
    }
  }

  createCodeSnippetsWithData(fileData, copyLines) {
    let fileDataByLine = fileData.split("\n");
    let codeRangeByType = this.createCodeLineRangeByType(fileData, copyLines);
    let snippets = [];
    codeRangeByType.forEach((range) => {
      let content = "";
      for (let i = range.start; i <= range.end; i++) {
        let line = fileDataByLine[i - 1];
        content += line + "\n";
      }
      snippets.push({
        type: range.type,
        content: content
      });
    });
    return snippets;
  }

  createCodeLineRangeByType(fileData, copyLines): any[] {
    let fileDataByLine = fileData.split("\n");
    let newLines = [];
    if (copyLines.length === 0) {
      newLines.push({
        start: 1,
        end: (fileDataByLine.length),
        type: 'spaced'
      });
    } else {
      for (let i = 0; i < copyLines.length; i++) {
        let line = copyLines[i], start = line.start;
        if (i === 0) {
          if (start !== 1) {
            newLines.push({
              start: 1,
              end: start - 1,
              type: 'spaced'
            });
          }
          newLines.push({...line, type: 'copy'});
        } else {
          if (start !== copyLines[i - 1].end + 1) {
            newLines.push({
              start: copyLines[i - 1].end + 1,
              end: start - 1,
              type: 'spaced'
            });
          }
          newLines.push({...line, type: 'copy'});
        }
      }
      if (fileDataByLine.length !== newLines[newLines.length - 1].end) {
        newLines.push({
          start: newLines[newLines.length - 1].end + 1,
          end: fileDataByLine.length,
          type: 'spaced'
        });
      }
    }
    return newLines;
  }

  getCodeMetadata(stepIndex, subStepIndex, globalOptionId) {
    let optionId = this.getSelectedOptionId(stepIndex, subStepIndex, globalOptionId);
    let subStep = this.getSubStep(stepIndex,subStepIndex);
    if (subStep && subStep.rightPane.type === 'code') {
      if (_.isArray(subStep.rightPane.data)) {
        if (optionId) {
          return subStep.rightPane.data.find((data) => {
            if (optionId) {
              return (data.optionId === optionId);
            }
          });
        }
        return subStep.rightPane.data[0];
      }
      return subStep.rightPane.data;
    }
    return null;
  }

  updateKeysInCode(code: string, state = this.state): string {
    let isObjectiveC = !!(state && state.code && state.code.language && state.code.language === "objectivec");
    let onBoardingActionId = this.onBoardingService.actionIdAssigned;
    let actionValue = onBoardingActionId ? `"${onBoardingActionId}"` : "ACTION_ID";
    let pkValue = isObjectiveC ? `@"${this.pkValue}"` : `"${this.pkValue}"`;
    let pkValueWithoutQuotes = `${this.pkValue}`;
    if (this.pkValue) {
      return code
        .replace(new RegExp('YOUR_PUBLISHABLE_KEY_WITHOUT_QUOTES', 'g'), pkValueWithoutQuotes)
        .replace(new RegExp('YOUR_PUBLISHABLE_KEY_HERE', 'g'), pkValue)
        .replace(new RegExp('YOUR_PUBLISHABLE_KEY', 'g'), pkValue)
        .replace(new RegExp('ACTION_ID', 'g'), actionValue);
    }
    return code;
  }

  toggleBlurCode() {
    this.blurCode = !this.blurCode;
    $('.spaced').toggleClass('blur');
  }

  createCodeElement(snippets: IOnBoardingCodeSnippet[], language: string, isDummy: boolean = false) {
    let codeElement = `<pre class="code-pre-container"><code class=${language}><div class="code-wrapper">`;
    snippets.forEach((code, index) => {
      if (code.type === 'spaced') {
        codeElement+= this.createSpacedCodeElement(code.content, index, isDummy);
      } else {
        codeElement+= this.createCopyCodeElement(code.content, index);
      }
    });
    codeElement += `</div></code></pre>`;
    return codeElement;
  }

  getDummyCodeSnippet() {
    return [{
      type: 'spaced',
      content: dummyCodeSnippet[0]
    }];
  }

  onJumpToStep(stepIndex, step) {
    if (step.subSteps.length > 0) {
      this.setState({stepIndex, subStepIndex: 0});
    }
  }

  createCopyCodeElement(code: string, index: number): string {
    let escapedCode = this.updateKeysInCode(_.escape(code));
    return `<div aria-label="Click to Copy" class="copyMe code-content" data-snippet-index="${index}"><a>${escapedCode}</a></div>`
  }

  createSpacedCodeElement(code: string, index: number, isDummy: boolean = false): string {
    let coreClass = isDummy ? 'dummy' : '';
    let escapedCode = this.updateKeysInCode(_.escape(code));
    return `<div class="spaced code-content blur ${coreClass}" data-snippet-index="${index}">${escapedCode}</div>`
  }

  fetchCodeFromURL(url) {
    return this.onBoardingService.getGithubFile(url).filter(data => !!data).map(fileData => fileData.data);
  }

  updateFileContentForStep(state, fileContent) {
    let stepIndex = state.stepIndex, subStepIndex = state.subStepIndex;
    let data = this.steps[stepIndex].subSteps[subStepIndex].rightPane.data;
    if (_.isArray(data)) {
      let selectedOptionId = this.getSelectedOptionId(state.stepIndex, state.subStepIndex, state.globalOptionId);
      data.forEach((d) => {
        if (d.optionId === selectedOptionId) {
          d.fileContent = fileContent;
        }
      });
    } else {
      this.steps[stepIndex].subSteps[subStepIndex].rightPane.data.fileContent = fileContent;
    }
  }

  getStepTitle(stepIndex, subStepIndex): string {
    let step = this.steps[stepIndex];
    if (step) {
      let currentSubStep = step.subSteps[subStepIndex];
      return currentSubStep ? currentSubStep.label : '';
    }
    return '';
  }

  getTotalSubStepsForStep(stepIndex): number {
    let step = this.steps[stepIndex];
    return (step ? step.subSteps.length : 0);
  }

  getStep(stepIndex): IOnBoardingStep {
    return this.steps[stepIndex];
  }

  getCodeOptions(stepIndex, subStepIndex, globalOptionId) {
    let optionId = this.getSelectedOptionId(stepIndex, subStepIndex, globalOptionId);
    let subStep = this.getSubStep(stepIndex,subStepIndex);
    let options = [];
    if (subStep && subStep.rightPane.type === 'code' && _.isArray(subStep.rightPane.data)) {
      options = subStep.rightPane.data.map((data, index) => {
        return {
          label: data.optionLabel || '',
          selected: optionId ? (data.optionId === optionId) : (index === 0),
          id: data.optionId
        }
      });
    }
    return options;
  }

  getSelectedOptionId(stepIndex, subStepIndex, globalOptionId) {
    return (globalOptionId || this.getSubStep(stepIndex, subStepIndex).rightPane.selectedOptionId);
  }

  switchCodeOption(state, optionId) {
    this.steps[state.stepIndex].subSteps[state.subStepIndex].rightPane.selectedOptionId = optionId;
    this.globalOptionId = optionId;
    this.setState({
      stepIndex: state.stepIndex,
      subStepIndex: state.subStepIndex
    });
  }

  getSubStep(stepIndex, subStepIndex): IOnBoardingSubStep {
    if (this.getStep(stepIndex)) return this.getStep(stepIndex).subSteps[subStepIndex];
    return null;
  }

  onNextStepAction(isArrowKey: boolean = false): void {
    if (this.isAnyModalOpen()) return;
    if (this.hasNextSubStep()) {
      this.setState({
        stepIndex: this.state.stepIndex,
        subStepIndex: this.state.subStepIndex + 1
      });
    } else if (this.hasNextStep(this.state.stepIndex) && !this.isNextStepDisabled(this.state.stepIndex)) {
      this.setState({
        stepIndex: this.state.stepIndex + 1,
        subStepIndex: 0
      });
    }
  }

  isAnyModalOpen() {
    return $('.modal.in').length > 0;
  }

  getNextStepActionLabel(stepIndex, subStepIndex) {
    if (this.hasNextSubStep()) {
      return this.getNextSubStepLabel(stepIndex, subStepIndex);
    } else if (this.hasNextStep(this.state.stepIndex)) {
      return this.getNextStepLabel(stepIndex, subStepIndex);
    }
  }

  getPrevStepActionLabel(stepIndex, subStepIndex) {
    if (this.hasPrevSubStep()) {
      return this.getPrevSubStepLabel(stepIndex, subStepIndex);
    } else if (this.hasPrevStep(stepIndex)) {
      return this.getPrevStepLabel(stepIndex, subStepIndex);
    }
  }

  getNextStepLabel(stepIndex, subStepIndex) {
    return (this.getNextStep(stepIndex) ? this.getNextStep(stepIndex).label : "");
  }

  getPrevStepLabel(stepIndex, subStepIndex) {
    return (this.getPrevStep(stepIndex) ? this.getPrevStep(stepIndex).label : "");
  }

  getNextStep(stepIndex) {
    return (this.hasNextStep(stepIndex) ? this.steps[stepIndex + 1] : null);
  }

  getPrevStep(stepIndex) {
    return (this.hasPrevStep(stepIndex) ? this.steps[stepIndex - 1] : null);
  }

  onPreviousStepAction(isArrowKey: boolean = false): void {
    if (this.isAnyModalOpen()) return;
    if (this.hasPrevSubStep()) {
      this.setState({
        stepIndex: this.state.stepIndex,
        subStepIndex: this.state.subStepIndex - 1
      });
    } else if (this.hasPrevStep(this.state.stepIndex)) {
      this.setState({
        stepIndex: this.state.stepIndex - 1,
        subStepIndex: this.getStep(this.state.stepIndex - 1).subSteps.length - 1
      });
    } else if (!isArrowKey){
      $('#mail-to-developer').modal();
    }
  }

  onNextSubStep(): void {
    if (this.hasNextSubStep()) {
      this.setState({
        stepIndex: this.state.stepIndex,
        subStepIndex: this.state.subStepIndex + 1
      });
    }
  }

  onPrevSubStep(): void {
    if (this.hasPrevSubStep()) {
      this.setState({
        stepIndex: this.state.stepIndex,
        subStepIndex: this.state.subStepIndex - 1
      });
    }
  }

  hasNextStep(stepIndex): boolean {
    return stepIndex < (this.steps.length - 1);
  }

  isNextStepDisabled(stepIndex) {
    return this.hasNextStep(stepIndex) && this.getStep(stepIndex + 1).subSteps.length === 0;
  }

  isNextStepActionDisabled(stepIndex, subStepIndex) {
    return !this.hasNextSubStep(stepIndex, subStepIndex) && this.isNextStepDisabled(stepIndex);
  }

  hasNextStepAction(): boolean {
    let currentStepIndex = this.state.stepIndex;
    let currentSubStepIndex = this.state.subStepIndex;
    return !(currentStepIndex === this.steps.length - 1 && currentSubStepIndex === this.getStep(currentStepIndex).subSteps.length - 1);
  }

  hasPrevStep(stepIndex): boolean {
    return stepIndex > 0;
  }

  hasPrevStepAction(stepIndex = this.state.stepIndex, subStepIndex = this.state.subStepIndex): boolean {
    return !(stepIndex === 0 && subStepIndex === 0);
  }

  hasPrevSubStep(subStepIndex = this.state.subStepIndex): boolean {
    return subStepIndex > 0;
  }

  hasNextSubStep(stepIndex = this.state.stepIndex, subStepIndex = this.state.subStepIndex): boolean {
    return subStepIndex < (this.getStep(stepIndex).subSteps.length - 1);
  }

  getNextSubStepLabel(stepIndex, subStepIndex): string {
    return this.getNextSubStep(stepIndex, subStepIndex) ? this.getNextSubStep(stepIndex, subStepIndex).label : "";
  }

  getPrevSubStepLabel(stepIndex, subStepIndex) {
    return this.getPrevSubStep(stepIndex, subStepIndex) ? this.getPrevSubStep(stepIndex, subStepIndex).label : "";
  }

  getNextSubStep(stepIndex = this.state.stepIndex, subStepIndex = this.state.subStepIndex) {
    return this.hasNextSubStep(stepIndex, subStepIndex) ? this.getSubStep(stepIndex, subStepIndex + 1) : null;
  }

  getPrevSubStep(stepIndex = this.state.stepIndex, subStepIndex = this.state.subStepIndex) {
    return this.hasPrevSubStep(subStepIndex) ? this.getSubStep(stepIndex, subStepIndex - 1) : null;
  }

  getSubStepContent(stepIndex, subStepIndex): string {
    if (this.getSubStep(stepIndex, subStepIndex)) {
      return marked(this.getSubStep(stepIndex, subStepIndex).leftPane);
    }
  }

  getStateFileLinkUrl(state) {
    return state.code.fileLinkUrl;
  }

  getStateFileName(state) {
    return state.code.fileName;
  }

  getStateCodeAdditions(state) {
    return state.code.additions;
  }

  showToolbarLanguages(state) {
    return state.code.options && (state.code.options.length > 1);
  }

  showToolbarLinks(state) {
    return true;
  }

  showCodeContainer(state) {
    return (state.subStep.rightPane.type === 'code');
  }

  showImageContainer(state) {
    return (state.subStep.rightPane.type === 'image');
  }

  getImageSrc(state) {
    return (state && state.image.fileSrc);
  }

  showCustomInfoContainer(state) {
    return false;
  }

  getCodeAdditionsText(additions): string {
    let additionsLabel = (additions <= 1) ? 'addition' : 'additions';
    return `${additions} ${additionsLabel}`;
  }

  private onScrollStop() {
    if (this.isCopyCodeVisible()) {
      this.showBouncingArrow(false);
    }
  }

  private isCopyCodeVisible() {
    let parentSelector = $('code.hljs');
    let copySelector = $('.copyMe:last');
    let spacedCodeSelector = $('.code-content:first');
    if ((parentSelector.length === 0) || (copySelector.length === 0) || (spacedCodeSelector.length === 0)) {
      this.showBouncingArrow(false);
      return true;
    }
    let offset = (copySelector.offset().top - spacedCodeSelector.offset().top) + 21;
    let isVisible = (parentSelector.height() + parentSelector.scrollTop()) > offset;
    return isVisible;
  }

  showBouncingArrow(showArrow: boolean) {
    let bounceArrowSelector = $('.code-arrow-bounce');
    if (showArrow) {
      bounceArrowSelector.show();
    } else {
      bounceArrowSelector.hide();
    }
  }

  ngAfterViewInit() {
    $('.code-pre-container code').each(function(i, block) {
      HighlightJS.highlightBlock(block);
    });
    let clip = new ClipboardJS('.copyMe', {
      text: (trigger) => {
        let index = trigger.getAttribute('data-snippet-index');
        let codeSnippets = this.state.code.snippets;
        return this.updateKeysInCode(codeSnippets[index].content, this.state);
      }
    });
    clip.on('success', function(e) {
      $(e.trigger).attr('aria-label', 'Copied!');
      e.clearSelection();
    });
    $('.copyMe').mouseleave(() => {
      $('.copyMe').attr('aria-label', 'Click to Copy');
    });
  }

  ngAfterViewChecked() {
    let onScrollStop = _.debounce(this.onScrollStop, 500);
    if (this.codeChanged) {
      $('.code-pre-container code').each(function(i, block) {
        HighlightJS.highlightBlock(block);
      });
      let copyElementSelector = $('.copyMe');
      let codeElementSelector = $('code.hljs');
      if (copyElementSelector.length > 0 && codeElementSelector.length > 0) {
        codeElementSelector.on('scroll', onScrollStop.bind(this));
        let offset = copyElementSelector.offset().top - codeElementSelector.offset().top - 21;
        codeElementSelector.animate({
          scrollTop: (offset)
        });
      }
      copyElementSelector.mouseleave(() => {
        $('.copyMe').attr('aria-label', 'Click to Copy');
      });
      if (!this.isCopyCodeVisible()) {
        this.showBouncingArrow(true);
      } else {
        this.showBouncingArrow(false);
      }
      this.codeChanged = false;
    }
  }
}
