using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

using Automatic9045.AtsEx.PluginHost;

namespace Automatic9045.VehiclePlugins.StateViewer {
    // 規定のクラスを継承することでプラグインとみなされます
    public class StateViewer : AtsExPlugin, IDisposable {
        private StateForm Form;
        private ToolStripMenuItem MenuItem;

        public StateViewer() : base() {
            // 右クリックメニューに独自のメニューを追加可能
            MenuItem = BveHacker.AddCheckableMenuItemToContextMenu("状態ウィンドウを表示", MenuItemCheckedChanged);

            App.Started += Started;
        }

        private void Started(StartedEventArgs e) {
            if (!(Form is null)) DisposeForm();

            MenuItem.Checked = false;

            // 独自のフォーム（ウィンドウ）を表示可能
            Form = new StateForm();
            Form.FormClosing += FormClosing;
            Form.WindowState = FormWindowState.Normal;

            MenuItem.Checked = true;
            BveHacker.MainForm.Focus();
        }

        private void MenuItemCheckedChanged(object sender, EventArgs e) {
            if (MenuItem.Checked) {
                Form.Show(BveHacker.MainForm);
            } else {
                Form.Hide();
            }
        }

        private void FormClosing(object sender, FormClosingEventArgs e) {
            e.Cancel = true;
            MenuItem.Checked = false;
        }

        private void DisposeForm() {
            Form.FormClosing -= FormClosing;
            Form.Close();
            Form.Dispose();
        }

        public void Dispose() => DisposeForm();
    }
}