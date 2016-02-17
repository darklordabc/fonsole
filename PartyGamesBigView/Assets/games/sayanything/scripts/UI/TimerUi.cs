﻿using UnityEngine;
using System.Collections;
using UnityEngine.UI;

namespace PPlatform.SayAnything.Ui
{
    public class TimerUi : MonoBehaviour
    {
        public Text _Timer;
	
	    // Update is called once per frame
	    void FixedUpdate ()
        {
	
            if(SayAnythingUi.Instance != null && _Timer != null)
            {
                int timeLeft = (int)SayAnythingUi.Instance.CurrentData.timeLeft;
                _Timer.text = "" + timeLeft;

            }
	    }
    }

}